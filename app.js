// app.js - الملف الرئيسي
import { initUpload } from './modules/upload.js';
import { PlantAnalyzer } from './modules/analyzer.js';  // تأكد من المسار الصحيح

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌿 تطبيق ماسح النباتات يعمل!');
    initUpload(); // تهيئة وحدة الرفع
     
    new PlantAnalyzer(); // تهيئة وحدة التحليل
});