import csv
import json
import statistics
from collections import defaultdict

def analyze_pcos_dataset(file_path):
    """
    Analyze Kaggle PCOS dataset and extract key statistics
    """
    
    # Read CSV file
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        data = list(reader)
    
    print(f"Total records: {len(data)}")
    
    # Analyze PCOS distribution
    pcos_positive = sum(1 for row in data if row.get('PCOS (Y/N)') in ['Y', '1'])
    pcos_negative = len(data) - pcos_positive
    
    print(f"\nPCOS Distribution:")
    print(f"  Positive: {pcos_positive} ({pcos_positive/len(data)*100:.1f}%)")
    print(f"  Negative: {pcos_negative} ({pcos_negative/len(data)*100:.1f}%)")
    
    # Analyze numeric features
    numeric_features = [
        'Age (yrs)', 'Weight (Kg)', 'Height(Cm)', 'BMI',
        'Pulse rate(bpm)', 'RR (breaths/min)', 'Hb(g/dl)',
        'Cycle(R/I)', 'Cycle length(days)', 'FSH(mIU/mL)',
        'LH(mIU/mL)', 'FSH/LH', 'Hip(inch)', 'Waist(inch)',
        'Waist:Hip Ratio', 'TSH (mIU/L)', 'AMH(ng/mL)',
        'PRL(ng/mL)', 'Vit D3 (ng/mL)', 'PRG(ng/mL)',
        'RBS(mg/dl)', 'BP _Systolic (mmHg)', 'BP _Diastolic (mmHg)',
        'Follicle No. (L)', 'Follicle No. (R)',
        'Avg. F size (L) (mm)', 'Avg. F size (R) (mm)',
        'Endometrium (mm)'
    ]
    
    print("\nFeature Statistics (PCOS Positive vs Negative):")
    print("-" * 80)
    
    feature_stats = {}
    
    for feature in numeric_features:
        if feature not in data[0]:
            continue
            
        # Extract values for PCOS positive and negative
        pcos_pos_values = []
        pcos_neg_values = []
        
        for row in data:
            try:
                value = float(row.get(feature, '').strip())
                if row.get('PCOS (Y/N)') in ['Y', '1']:
                    pcos_pos_values.append(value)
                else:
                    pcos_neg_values.append(value)
            except (ValueError, AttributeError):
                continue
        
        if pcos_pos_values and pcos_neg_values:
            pos_mean = statistics.mean(pcos_pos_values)
            neg_mean = statistics.mean(pcos_neg_values)
            pos_std = statistics.stdev(pcos_pos_values) if len(pcos_pos_values) > 1 else 0
            neg_std = statistics.stdev(pcos_neg_values) if len(pcos_neg_values) > 1 else 0
            
            feature_stats[feature] = {
                'pcos_positive_mean': round(pos_mean, 2),
                'pcos_positive_std': round(pos_std, 2),
                'pcos_negative_mean': round(neg_mean, 2),
                'pcos_negative_std': round(neg_std, 2),
                'difference': round(abs(pos_mean - neg_mean), 2)
            }
            
            print(f"{feature:30} | PCOS+: {pos_mean:.2f}±{pos_std:.2f} | "
                  f"PCOS-: {neg_mean:.2f}±{neg_std:.2f} | Diff: {abs(pos_mean-neg_mean):.2f}")
    
    # Identify most discriminative features
    sorted_features = sorted(feature_stats.items(), 
                            key=lambda x: x[1]['difference'], 
                            reverse=True)
    
    print("\nTop 10 Most Discriminative Features:")
    print("-" * 80)
    for feature, stats in sorted_features[:10]:
        print(f"{feature:30} | Difference: {stats['difference']:.2f}")
    
    # Analyze missing values
    print("\nMissing Values Analysis:")
    print("-" * 80)
    missing_counts = defaultdict(int)
    
    for feature in data[0].keys():
        for row in data:
            if not row.get(feature) or row.get(feature).strip() in ['', 'NA', 'N/A']:
                missing_counts[feature] += 1
    
    for feature, count in sorted(missing_counts.items(), key=lambda x: x[1], reverse=True):
        if count > 0:
            print(f"{feature:30} | Missing: {count} ({count/len(data)*100:.1f}%)")
    
    # Save analysis results
    analysis_results = {
        'total_records': len(data),
        'pcos_distribution': {
            'positive': pcos_positive,
            'negative': pcos_negative
        },
        'feature_statistics': feature_stats,
        'top_discriminative_features': [f[0] for f in sorted_features[:10]],
        'missing_values': dict(missing_counts)
    }
    
    with open('pcos_analysis_results.json', 'w') as f:
        json.dump(analysis_results, f, indent=2)
    
    print("\nAnalysis results saved to 'pcos_analysis_results.json'")
    print("\nRecommendations for ML Model:")
    print("- Use top discriminative features for better accuracy")
    print("- Apply median imputation for missing values")
    print("- Consider feature scaling (standardization)")
    print("- Handle class imbalance if necessary")

# Example usage:
# analyze_pcos_dataset('path/to/kaggle_pcos_dataset.csv')

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        analyze_pcos_dataset(sys.argv[1])
    else:
        print("Usage: python analyze_kaggle_pcos.py <path_to_csv>")
