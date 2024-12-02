export const analyzeHealthData = (formData) => {
  const { hemoglobin, sugarLevel, age, sex } = formData;
  let diagnosis = 'No specific diagnosis.';
  let medicines = [];
  let dietPlan = 'Follow a balanced diet.';

  // Hemoglobin analysis
  if (hemoglobin) {
    const hemoglobinValue = parseFloat(hemoglobin);
    if (hemoglobinValue < 12) {
      diagnosis = 'Low Hemoglobin (Anemia)';
      medicines.push('Iron supplements');
      dietPlan = 'Increase intake of iron-rich foods like spinach, lentils, and red meat.';
    } else if (hemoglobinValue > 17) {
      diagnosis = 'High Hemoglobin (Polycythemia)';
      medicines.push('Blood thinners');
      dietPlan = 'Avoid iron-rich foods, and stay hydrated.';
    } else {
      diagnosis = 'Normal Hemoglobin';
    }
  }

  // Sugar level analysis
  if (sugarLevel) {
    const sugarValue = parseFloat(sugarLevel);
    if (sugarValue < 70) {
      diagnosis += ' Low Blood Sugar (Hypoglycemia)';
      medicines.push('Glucose tablets');
      dietPlan = 'Increase intake of fast-acting carbohydrates like fruit juice or candies.';
    } else if (sugarValue > 180) {
      diagnosis += ' High Blood Sugar (Hyperglycemia or Diabetes)';
      medicines.push('Insulin or oral hypoglycemic agents');
      dietPlan = 'Focus on a low-carb diet, avoid sugary foods, and consult a doctor for medication.';
    } else {
      diagnosis += ' Normal Blood Sugar Level';
    }
  }

  // Age-based recommendations
  if (age) {
    const ageValue = parseInt(age, 10);
    if (ageValue >= 60) {
      dietPlan += ' Include more calcium and vitamin D in your diet to maintain bone health.';
      medicines.push('Calcium and Vitamin D supplements');
    }
  }

  // Gender-based recommendations (for completeness)
  if (sex && sex.toLowerCase() === 'female') {
    dietPlan += ' Ensure adequate intake of folic acid, especially if you are of childbearing age.';
  }

  return {
    diagnosis,
    medicines,
    dietPlan,
  };
};
