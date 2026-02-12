import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-amber-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Project: {id}</h1>
        <p>Full details, gallery, EMI calculator here. Premium gated society in Vrindavan.</p>
      </div>
    </div>
  );
};

export default ProjectDetail;
