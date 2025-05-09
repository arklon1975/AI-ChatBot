from flask import Flask, jsonify, request, abort
from uuid import uuid4
from threading import Thread
from crews import TechnologyResearchCrew
from log_manager import append_event, outputs, outputs_lock, Event
from datetime import datetime
import json
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import time

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuración del rate limiter
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Cache para almacenar resultados recientes
result_cache = {}
CACHE_EXPIRY = 3600  # 1 hora en segundos

def kickoff_crew(input_id, technologies: list[str], businessareas: list[str]):
    print(f"Running crew for {input_id} with technologies {technologies} and businessareas {businessareas}")

    results = None
    try:
        company_research_crew = TechnologyResearchCrew(input_id)
        company_research_crew.setup_crew(
            technologies, businessareas)
        results = company_research_crew.kickoff()

    except Exception as e:
        print(f"CREW FAILED: {str(e)}")
        append_event(input_id, f"CREW FAILED: {str(e)}")
        with outputs_lock:
            outputs[input_id].status = 'ERROR'
            outputs[input_id].result = str(e)

    with outputs_lock:
        outputs[input_id].status = 'COMPLETE'
        outputs[input_id].result = results
        outputs[input_id].events.append(
            Event(timestamp=datetime.now(), data="Crew complete"))

@app.route('/api/multiagent', methods=['POST'])
@limiter.limit("10 per minute")
def run_crew():
    try:
        data = request.json
        if not data or 'technologies' not in data or 'businessareas' not in data:
            abort(400, description="Invalid request with missing data.")
        
        # Validar entrada
        technologies = data['technologies']
        businessareas = data['businessareas']
        
        if not isinstance(technologies, list) or not isinstance(businessareas, list):
            abort(400, description="Technologies and businessareas must be lists")
        
        if len(technologies) > 5 or len(businessareas) > 5:
            abort(400, description="Maximum 5 items allowed for technologies and businessareas")
        
        # Generar cache key
        cache_key = f"{','.join(sorted(technologies))}_{','.join(sorted(businessareas))}"
        
        # Verificar cache
        if cache_key in result_cache:
            cache_entry = result_cache[cache_key]
            if time.time() - cache_entry['timestamp'] < CACHE_EXPIRY:
                return jsonify({"input_id": cache_entry['input_id']}), 200
        
        input_id = str(uuid4())
        thread = Thread(target=kickoff_crew, args=(input_id, technologies, businessareas))
        thread.start()
        
        # Guardar en cache
        result_cache[cache_key] = {
            'input_id': input_id,
            'timestamp': time.time()
        }
        
        return jsonify({"input_id": input_id}), 200
    
    except Exception as e:
        app.logger.error(f"Error in run_crew: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/multiagent/<input_id>', methods=['GET'])
@limiter.limit("30 per minute")
def get_status(input_id):
    try:
        with outputs_lock:
            output = outputs.get(input_id)
            if output is None:
                abort(404, description="Output not found")

        # Parse the output.result string into a JSON object
        try:
            result_json = json.loads(output.result)
        except json.JSONDecodeError:
            result_json = output.result

        return jsonify({
            "input_id": input_id,
            "status": output.status,
            "result": result_json,
            "events": [{"timestamp": event.timestamp.isoformat(), "data": event.data} for event in output.events]
        })
    
    except Exception as e:
        app.logger.error(f"Error in get_status: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3001)