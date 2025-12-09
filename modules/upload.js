// modules/upload.js - وحدة رفع الملفات
export function initUpload() {
    const fileInput = document.getElementById('file-input');
    const fileName = document.getElementById('file-name');
    const clearBtn = document.getElementById('clear-btn');
    const dropArea = document.getElementById('drop-area');

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
        // هنا سنضيف عرض الصورة لاحقاً
    }

    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}