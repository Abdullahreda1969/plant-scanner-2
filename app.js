// app.js - الملف الرئيسي
import { initUpload } from './modules/upload.js';

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌿 تطبيق ماسح النباتات يعمل!');
    initUpload();
});