document.addEventListener('DOMContentLoaded', () => {
    // 显示登录卡片
    const loginCard = document.querySelector('.login-card');
    if (loginCard) {
        // 确保卡片渲染完成后再显示
        setTimeout(() => {
            loginCard.style.opacity = '1';
            loginCard.style.transform = 'translateY(0)';
        }, 400);
    }
    
    // 密码显示/隐藏功能
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            // 切换密码输入类型
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // 切换眼睛图标
            const eyeIcon = togglePassword.querySelector('i');
            eyeIcon.classList.toggle('fa-eye');
            eyeIcon.classList.toggle('fa-eye-slash');
        });
    }
    
    // 登录按钮点击事件
    const loginBtn = document.querySelector('.login-btn');
    const usernameInput = document.getElementById('username');
    
    if (loginBtn && usernameInput && passwordInput) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 简单表单验证
            let isValid = true;
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            // 重置错误状态
            resetErrorState();
            
            // 验证用户名
            if (username === '') {
                showError(usernameInput, '请输入用户名或邮箱');
                isValid = false;
            }
            
            // 验证密码
            if (password === '') {
                showError(passwordInput, '请输入密码');
                isValid = false;
            }
            
            // 如果验证通过，模拟登录成功
            if (isValid) {
                // 模拟加载状态
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
                loginBtn.disabled = true;
                loginBtn.style.opacity = '0.8';
                
                // 模拟API调用
                setTimeout(() => {
                    // 这里通常是调用登录API
                    // 显示登录成功消息
                    showSuccessMessage();
                    
                    // 重置登录按钮
                    setTimeout(() => {
                        loginBtn.innerHTML = '登录';
                        loginBtn.disabled = false;
                        loginBtn.style.opacity = '1';
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // 输入框获得焦点时移除错误状态
    const inputFields = document.querySelectorAll('.input-group input');
    inputFields.forEach(input => {
        input.addEventListener('focus', function() {
            const parent = this.closest('.input-group');
            if (parent.classList.contains('error')) {
                parent.classList.remove('error');
                
                // 移除错误提示
                const errorMsg = parent.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            }
        });
    });
    
    // 显示错误消息
    function showError(inputElement, message) {
        const parent = inputElement.closest('.input-group');
        parent.classList.add('error');
        
        // 创建错误消息元素
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // 设置样式
        errorDiv.style.color = '#ff5a5a';
        errorDiv.style.fontSize = '13px';
        errorDiv.style.fontWeight = '500';
        errorDiv.style.marginTop = '-12px';
        errorDiv.style.marginBottom = '15px';
        errorDiv.style.paddingLeft = '15px';
        errorDiv.style.display = 'flex';
        errorDiv.style.alignItems = 'center';
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(-5px)';
        errorDiv.style.transition = 'all 0.3s ease';
        
        // 添加图标
        const icon = document.createElement('i');
        icon.className = 'fas fa-exclamation-circle';
        icon.style.marginRight = '6px';
        icon.style.fontSize = '12px';
        errorDiv.prepend(icon);
        
        // 插入错误消息
        parent.after(errorDiv);
        
        // 添加动画效果
        setTimeout(() => {
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
        }, 10);
        
        // 添加输入框错误样式
        parent.style.borderColor = 'rgba(255, 90, 90, 0.3)';
        parent.style.backgroundColor = 'rgba(255, 240, 240, 0.5)';
    }
    
    // 重置所有错误状态
    function resetErrorState() {
        const errorFields = document.querySelectorAll('.input-group.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
            field.style.borderColor = '';
            field.style.backgroundColor = '';
        });
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(-5px)';
            setTimeout(() => msg.remove(), 300);
        });
    }
    
    // 显示成功消息
    function showSuccessMessage() {
        // 创建成功消息元素
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        
        // 设置样式
        successDiv.style.color = '#29c76f';
        successDiv.style.backgroundColor = 'rgba(230, 255, 243, 0.7)';
        successDiv.style.textAlign = 'center';
        successDiv.style.fontWeight = '500';
        successDiv.style.padding = '14px';
        successDiv.style.marginTop = '15px';
        successDiv.style.borderRadius = '12px';
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateY(10px)';
        successDiv.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        successDiv.style.boxShadow = '0 4px 12px rgba(41, 199, 111, 0.1)';
        successDiv.style.border = '1px solid rgba(41, 199, 111, 0.2)';
        
        // 添加内容
        const icon = document.createElement('i');
        icon.className = 'fas fa-check-circle';
        icon.style.marginRight = '8px';
        icon.style.fontSize = '16px';
        
        const textSpan = document.createElement('span');
        textSpan.textContent = '登录成功！';
        
        successDiv.appendChild(icon);
        successDiv.appendChild(textSpan);
        
        // 将成功消息添加到登录表单后
        const loginForm = document.querySelector('.login-form');
        loginForm.appendChild(successDiv);
        
        // 显示成功消息
        setTimeout(() => {
            successDiv.style.opacity = '1';
            successDiv.style.transform = 'translateY(0)';
        }, 100);
        
        // 2秒后移除成功消息
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                successDiv.remove();
            }, 500);
        }, 2000);
    }
}); 