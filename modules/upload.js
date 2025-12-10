// modules/upload.js - وحدة رفع الملفات
export function initUpload() {
    const fileInput = document.getElementById('file-input');
    const fileName = document.getElementById('file-name');
    const clearBtn = document.getElementById('clear-btn');
    const dropArea = document.getElementById('drop-area');
    console.log('عناصر DOM:', { fileInput, fileName, clearBtn, dropArea });
    const analyzeBtn = document.getElementById('analyze-btn');
    let currentFile = null; // لتخزين الملف الحالي

    // عند اختيار ملف
    fileInput.addEventListener('change', function(e) {
        if (this.files.length > 0) {
            const file = this.files[0];
            handleFile(file);
        }
    });

    // دعم السحب والإفلات
    dropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.background = '#e8f5e9';
    });

    dropArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.background = '#f8fff9';
    });

    dropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.background = '#f8fff9';
        
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            fileInput.files = e.dataTransfer.files;
            handleFile(file);
        }
    });

    // زر المسح
    clearBtn.addEventListener('click', function() {
        fileInput.value = '';
        fileName.textContent = 'لم يتم اختيار أي ملف';
        clearBtn.disabled = true;
         // تعطيل زر التحليل
        analyzeBtn.disabled = true;
        currentFile = null;
        console.log('تم مسح الملف');
               
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('الرجاء اختيار صورة فقط!');
            return;
        }

        fileName.textContent = `الملف: ${file.name} (${formatBytes(file.size)})`;
        clearBtn.disabled = false;
        
        console.log('تم رفع الملف:', file.name);
        showImagePreview(file);
                // تفعيل زر التحليل
        analyzeBtn.disabled = false;
        currentFile = file;
    }

    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
        // دالة لعرض معاينة الصورة
    function showImagePreview(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // تحقق إذا كانت هناك معاينة سابقة واحذفها
            const oldPreview = document.getElementById('image-preview');
            if (oldPreview) {
                oldPreview.remove();
            }
            
            // إنصر عنصر المعاينة الجديد
            const previewDiv = document.createElement('div');
            previewDiv.id = 'image-preview';
            previewDiv.style.cssText = `
                margin: 20px auto;
                text-align: center;
                max-width: 300px;
            `;
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'معاينة الصورة';
            img.style.cssText = `
                max-width: 100%;
                max-height: 300px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                border: 3px solid #4CAF50;
            `;
            
            const caption = document.createElement('p');
            caption.textContent = 'معاينة الصورة';
            caption.style.cssText = `
                margin-top: 10px;
                color: #666;
                font-weight: bold;
            `;
            
            previewDiv.appendChild(img);
            previewDiv.appendChild(caption);
            dropArea.appendChild(previewDiv);
            
            // أضف زر إزالة المعاينة
            addRemovePreviewButton(previewDiv, file.name);
        };
        
        reader.readAsDataURL(file);
    }
        // دالة لإضافة زر إزالة المعاينة
    function addRemovePreviewButton(previewDiv, fileName) {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'إزالة المعاينة';
        removeBtn.style.cssText = `
            background: #ff9800;
            margin-top: 10px;
            font-size: 0.9rem;
            padding: 8px 16px;
        `;
        
        removeBtn.onclick = function() {
            previewDiv.remove();
            // إعادة تعيين حالة الرفع
            fileInput.value = '';
            fileName.textContent = 'لم يتم اختيار أي ملف';
            clearBtn.disabled = true;
            console.log('تمت إزالة معاينة:', fileName);
        };
        
        previewDiv.appendChild(removeBtn);
    }
}