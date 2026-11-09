/**
 * XivigAdmin - Authentication Module
 * Handles password toggling, OTP auto-advance, clipboard paste, password strength, and timers
 */

export function initAuth() {
  initPasswordToggles();
  initOtpInputs();
  initPasswordStrength();
  initCountdowns();
}

/**
 * Password Visibility Toggles
 * Supports [data-toggle-password] buttons in input groups
 */
function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('[data-toggle-password]');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const group = btn.closest('.input-group') || btn.parentElement;
      if (!group) return;

      const input = group.querySelector('input[type="password"], input[type="text"]');
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      const icon = btn.querySelector('i');
      if (icon) {
        if (isPassword) {
          icon.classList.remove('bi-eye');
          icon.classList.add('bi-eye-slash');
          btn.setAttribute('aria-label', 'Hide password');
        } else {
          icon.classList.remove('bi-eye-slash');
          icon.classList.add('bi-eye');
          btn.setAttribute('aria-label', 'Show password');
        }
      }
    });
  });
}

/**
 * OTP 6-Digit Auto-advance and Paste Handler
 * Used in Two-Factor Authentication
 */
function initOtpInputs() {
  const otpContainers = document.querySelectorAll('.fauth-otp');
  otpContainers.forEach((container) => {
    const inputs = Array.from(container.querySelectorAll('.fauth-otp-input'));
    if (!inputs.length) return;

    inputs.forEach((input, index) => {
      // Handle digit typing & auto advance
      input.addEventListener('input', (e) => {
        const val = input.value.replace(/\D/g, '');
        input.value = val ? val.slice(-1) : '';

        if (input.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
          inputs[index + 1].select();
        }
      });

      // Handle backspace navigation
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (!input.value && index > 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = '';
          }
        } else if (e.key === 'ArrowLeft' && index > 0) {
          inputs[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      // Handle paste on any OTP input
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pasteData.replace(/\D/g, '').slice(0, inputs.length);
        if (!digits) return;

        digits.split('').forEach((char, i) => {
          if (inputs[i]) {
            inputs[i].value = char;
          }
        });

        const nextIndex = Math.min(digits.length, inputs.length - 1);
        inputs[nextIndex].focus();
      });
    });
  });
}

/**
 * Dynamic Password Strength Meter
 */
function initPasswordStrength() {
  const passwordInputs = document.querySelectorAll('[data-password-meter]');
  passwordInputs.forEach((input) => {
    const meter = document.querySelector(input.dataset.passwordMeter);
    const feedback = document.querySelector(input.dataset.passwordFeedback);
    if (!meter) return;

    const fill = meter.querySelector('.fauth-strength-fill');
    const rules = {
      length: document.querySelector('[data-rule="length"]'),
      number: document.querySelector('[data-rule="number"]'),
      upper: document.querySelector('[data-rule="upper"]'),
      symbol: document.querySelector('[data-rule="symbol"]')
    };

    input.addEventListener('input', () => {
      const val = input.value;
      let score = 0;

      const hasLength = val.length >= 8;
      const hasNumber = /\d/.test(val);
      const hasUpper = /[A-Z]/.test(val) && /[a-z]/.test(val);
      const hasSymbol = /[^A-Za-z0-9]/.test(val);

      if (hasLength) score++;
      if (hasNumber) score++;
      if (hasUpper) score++;
      if (hasSymbol) score++;

      // Update rule checklist if present
      updateRuleState(rules.length, hasLength);
      updateRuleState(rules.number, hasNumber);
      updateRuleState(rules.upper, hasUpper);
      updateRuleState(rules.symbol, hasSymbol);

      // Update visual meter bar
      if (fill) {
        fill.className = 'fauth-strength-fill';
        if (!val) {
          fill.style.width = '0%';
          if (feedback) feedback.textContent = '';
        } else if (score <= 1) {
          fill.classList.add('strength-weak');
          fill.style.width = '25%';
          if (feedback) feedback.textContent = 'Weak password';
        } else if (score === 2) {
          fill.classList.add('strength-fair');
          fill.style.width = '50%';
          if (feedback) feedback.textContent = 'Fair password';
        } else if (score === 3) {
          fill.classList.add('strength-good');
          fill.style.width = '75%';
          if (feedback) feedback.textContent = 'Good password';
        } else {
          fill.classList.add('strength-strong');
          fill.style.width = '100%';
          if (feedback) feedback.textContent = 'Strong password';
        }
      }
    });
  });
}

function updateRuleState(elem, passed) {
  if (!elem) return;
  const icon = elem.querySelector('i');
  if (passed) {
    elem.classList.add('is-valid');
    if (icon) {
      icon.className = 'bi bi-check-circle-fill text-success';
    }
  } else {
    elem.classList.remove('is-valid');
    if (icon) {
      icon.className = 'bi bi-circle text-muted';
    }
  }
}

/**
 * Countdown Timer for Resending Verification Codes
 */
function initCountdowns() {
  const countdowns = document.querySelectorAll('[data-resend-countdown]');
  countdowns.forEach((el) => {
    let seconds = parseInt(el.dataset.resendCountdown, 10);
    if (isNaN(seconds) || seconds <= 0) return;

    const originalText = el.dataset.originalText || el.textContent;
    const prefix = el.dataset.prefix || 'Resend code in';

    const timer = setInterval(() => {
      seconds--;
      if (seconds > 0) {
        el.textContent = `${prefix} (${seconds}s)`;
        el.classList.add('disabled');
        el.style.pointerEvents = 'none';
      } else {
        clearInterval(timer);
        el.textContent = originalText;
        el.classList.remove('disabled');
        el.style.pointerEvents = 'auto';
      }
    }, 1000);
  });
}
