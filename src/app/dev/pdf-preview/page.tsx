'use client';

import { useState } from 'react';
import { generateHTMLPreview, generateTestScenarios } from '@/lib/pdf-generation/template-preview';

export default function PDFPreviewPage() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [previewHTML, setPreviewHTML] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const scenarios = generateTestScenarios();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'de'>('en');

  const generatePreview = () => {
    const scenario = scenarios[selectedScenario];
    const html = generateHTMLPreview(scenario.leadData, scenario.calculatedValues);
    setPreviewHTML(html);
  };

  const downloadTestPDF = async () => {
    setIsGenerating(true);
    try {
      const scenario = scenarios[selectedScenario];
      // Update scenario with selected language
      const testData = {
        leadData: { ...scenario.leadData, language: selectedLanguage },
        calculatedValues: scenario.calculatedValues,
      };
      
      const response = await fetch('/api/pdf/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `test-${scenario.name.toLowerCase().replace(/\s+/g, '-')}-${selectedLanguage}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const error = await response.json();
        alert(`PDF generation failed: ${error.error}`);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            PDF Template Preview & Testing
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Scenario
              </label>
              <select
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {scenarios.map((scenario, index) => (
                  <option key={index} value={index}>
                    {scenario.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                {scenarios[selectedScenario].description}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'de')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="de">Deutsch (German)</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                PDF will be generated in selected language
              </p>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={generatePreview}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
              >
                Generate HTML Preview
              </button>
              <button
                onClick={downloadTestPDF}
                disabled={isGenerating}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Download Test PDF'}
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Current Scenario Data:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div><strong>Organization:</strong> {scenarios[selectedScenario].leadData.organizationName}</div>
                <div><strong>Contact:</strong> {scenarios[selectedScenario].leadData.fullName}</div>
                <div><strong>Total Value:</strong> €{scenarios[selectedScenario].calculatedValues.totalValueCreated.toLocaleString()}</div>
                <div><strong>Language:</strong> {selectedLanguage === 'de' ? 'Deutsch' : 'English'}</div>
              </div>
            </div>
          </div>
        </div>

        {previewHTML && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">HTML Preview</h2>
              <div className="text-sm text-gray-500">
                This shows how the PDF template will render
              </div>
            </div>
            
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <iframe
                srcDoc={previewHTML}
                className="w-full h-screen"
                title="PDF Preview"
              />
            </div>
          </div>
        )}

        {!previewHTML && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Preview Generated</h3>
            <p className="text-gray-500">
              Select a test scenario and click "Generate HTML Preview" to see how your PDF template will look.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}