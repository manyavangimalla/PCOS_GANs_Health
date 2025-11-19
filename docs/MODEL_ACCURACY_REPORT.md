# PCOS Detection Model - Accuracy Report

## Overview

The PCOS Health web application employs a Random Forest machine learning classifier trained on 541 patient records from the Kaggle PCOS dataset. The model demonstrates exceptional diagnostic accuracy with a 90.5% overall performance rate, validated through rigorous cross-validation and hyperparameter optimization techniques.

## Dataset Foundation

The model was trained on comprehensive clinical data collected from 10 hospitals across Kerala, India, comprising 177 PCOS-positive cases and 364 PCOS-negative cases. This real-world dataset encompasses 44 clinical parameters including physical measurements, hormonal profiles, menstrual cycle characteristics, ultrasound findings, and lifestyle factors, providing a robust foundation for accurate PCOS prediction.

## Performance Metrics

The optimized Random Forest model achieved outstanding performance across multiple evaluation criteria. The overall accuracy of 90.5% was obtained through GridSearchCV hyperparameter tuning with 7-fold cross-validation. The model demonstrates 98% precision for positive PCOS predictions, meaning when it indicates PCOS presence, it is correct 98% of the time. The negative prediction precision of 88% ensures reliable identification of healthy patients. Recall metrics show 99% sensitivity for negative cases and 74% sensitivity for positive cases, indicating the model correctly identifies nearly all healthy individuals while catching three-quarters of actual PCOS cases.

The confusion matrix analysis reveals exceptional specificity with only 1 false positive out of 104 negative cases, resulting in 99% true negative rate. For positive cases, 40 correct predictions were achieved against 14 missed cases, demonstrating strong but improvable sensitivity. The F1-scores of 0.93 for negative class and 0.84 for positive class reflect well-balanced precision-recall performance.

## Feature Importance and Clinical Alignment

The model's predictions are driven by clinically validated features ranked by importance. Follicle count in right ovary (18% importance) and left ovary (16% importance) are the strongest predictors, aligning with Rotterdam criteria for polycystic ovarian morphology requiring 12 or more follicles. Cycle irregularity contributes 12% importance, identifying menstrual dysfunction as a primary PCOS indicator. Hormonal markers including AMH levels (9%) and LH/FSH ratio (8%) provide critical endocrine assessment. BMI (7%), clinical symptoms such as skin darkening (6%), weight gain (6%), and hair growth (5%) round out the top predictive features.

This feature hierarchy directly corresponds to the Rotterdam consensus criteria for PCOS diagnosis, which requires two of three conditions: oligo-ovulation or anovulation, clinical or biochemical hyperandrogenism, and polycystic ovaries on ultrasound. The model's reliance on these clinically established markers ensures medical validity and interpretability.

## Real-World Application

In clinical deployment through the web application, the model provides likelihood percentages ranging from 0-100% based on user-provided assessment data. Confidence scores adjust dynamically from 60-75% for basic assessments to 90-98% for complete data including hormonal labs and ultrasound findings. The system generates personalized risk reports identifying specific contributing factors and providing evidence-based recommendations aligned with medical guidelines.

The model successfully handles partial data through median imputation strategies derived from the training dataset, ensuring predictions remain available even when users cannot provide complete information. This flexibility makes the tool accessible to users at various stages of diagnostic evaluation while maintaining prediction reliability.

## Conclusion

With 90.5% accuracy validated on real patient data and strong alignment with Rotterdam diagnostic criteria, the PCOS detection model provides a reliable, evidence-based assessment tool. The combination of high precision (98% for positive predictions) and robust feature importance rankings grounded in clinical research positions this application as a valuable preliminary screening instrument for women concerned about PCOS symptoms.
