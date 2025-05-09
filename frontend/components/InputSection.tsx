"use client";

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface InputSectionProps {
  onSubmit: (technologies: string[], businessAreas: string[]) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [technologies, setTechnologies] = useState('');
  const [businessAreas, setBusinessAreas] = useState('');
  const [errors, setErrors] = useState<{ technologies?: string; businessAreas?: string }>({});

  const validateInput = (): boolean => {
    const newErrors: { technologies?: string; businessAreas?: string } = {};
    
    // Validar tecnologías
    if (!technologies.trim()) {
      newErrors.technologies = 'Las tecnologías son requeridas';
    } else if (technologies.split(',').length > 5) {
      newErrors.technologies = 'Máximo 5 tecnologías permitidas';
    }

    // Validar áreas de negocio
    if (!businessAreas.trim()) {
      newErrors.businessAreas = 'Las áreas de negocio son requeridas';
    } else if (businessAreas.split(',').length > 5) {
      newErrors.businessAreas = 'Máximo 5 áreas de negocio permitidas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInput()) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    const techArray = technologies.split(',').map(tech => tech.trim()).filter(Boolean);
    const areasArray = businessAreas.split(',').map(area => area.trim()).filter(Boolean);

    onSubmit(techArray, areasArray);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
            Tecnologías (separadas por comas)
          </label>
          <input
            type="text"
            id="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.technologies ? 'border-red-500' : ''
            }`}
            placeholder="Ej: AI, Machine Learning, Blockchain"
            disabled={isLoading}
          />
          {errors.technologies && (
            <p className="mt-1 text-sm text-red-600">{errors.technologies}</p>
          )}
        </div>

        <div>
          <label htmlFor="businessAreas" className="block text-sm font-medium text-gray-700">
            Áreas de Negocio (separadas por comas)
          </label>
          <input
            type="text"
            id="businessAreas"
            value={businessAreas}
            onChange={(e) => setBusinessAreas(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.businessAreas ? 'border-red-500' : ''
            }`}
            placeholder="Ej: Healthcare, Finance, Education"
            disabled={isLoading}
          />
          {errors.businessAreas && (
            <p className="mt-1 text-sm text-red-600">{errors.businessAreas}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Procesando...' : 'Iniciar Investigación'}
        </button>
      </form>
    </div>
  );
};

export default InputSection;