// modules/analyzer.js - وحدة التحليل
import { PlantNetMockAPI } from './api-mock.js';

export class PlantAnalyzer {
    constructor() {
        this.api = new PlantNetMockAPI();
        this.resultDiv = document.getElementById('plant-info');
        this.resultSection = document.getElementById('result');
        this.loadingDiv = document.getElementById('loading');
        this.analyzeBtn = document.getElementById('analyze-btn');
        
        this.init();
    }
    
    init() {
        this.analyzeBtn.addEventListener('click', () => this.analyzePlant());
    }
    
    async analyzePlant() {
        // إظهار مؤشر التحميل
        this.showLoading(true);
        
        try {
            // محاكاة إرسال الصورة للـ API
            const result = await this.api.identifyPlant();
            
            // إخفاء التحميل وعرض النتائج
            this.showLoading(false);
            this.displayResults(result);
            
        } catch (error) {
            this.showLoading(false);
            this.showError('حدث خطأ أثناء التحليل');
        }
    }
    
    showLoading(show) {
        if (show) {
            this.loadingDiv.classList.remove('hidden');
            this.analyzeBtn.disabled = true;
        } else {
            this.loadingDiv.classList.add('hidden');
            this.analyzeBtn.disabled = false;
        }
    }
    
    displayResults(data) {
        this.resultSection.classList.remove('hidden');
        
        const plant = data.plant;
        const html = `
            <div class="result-card">
                <div style="font-size: 3rem; text-align: center;">${plant.image}</div>
                <h2 class="plant-name">${plant.name}</h2>
                <p class="scientific-name">${plant.scientificName}</p>
                <span class="confidence">دقة: ${(plant.confidence * 100).toFixed(1)}%</span>
                
                <div style="margin: 20px 0;">
                    <h3>الوصف:</h3>
                    <p>${plant.description}</p>
                    
                    <h3>طرق العناية:</h3>
                    <p>${plant.treatment}</p>
                </div>
                
                <h3>اقتراحات:</h3>
                <ul>
                    ${data.suggestions.map(s => `<li>${s}</li>`).join('')}
                </ul>
                
                <p style="margin-top: 20px; color: #888; font-size: 0.9rem;">
                    آخر تحديث: ${data.timestamp}
                </p>
            </div>
        `;
        
        this.resultDiv.innerHTML = html;
    }
    
    showError(message) {
        this.resultSection.classList.remove('hidden');
        this.resultDiv.innerHTML = `
            <div style="background: #ffebee; color: #c62828; padding: 20px; border-radius: 10px;">
                <h3>⚠️ خطأ</h3>
                <p>${message}</p>
                <button onclick="location.reload()">إعادة المحاولة</button>
            </div>
        `;
    }
}