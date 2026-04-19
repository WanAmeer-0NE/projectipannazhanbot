// ══════════════════════════════════════════
//  Hazim Bot — script.js
// ══════════════════════════════════════════

// ── Smooth scroll for nav links ────────────
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    const text = link.textContent.trim().toLowerCase();
    let target = null;

    if (text === 'home')     target = document.querySelector('.hero');
    if (text === 'features') target = document.querySelector('.features');
    if (text === 'chat')     target = document.querySelector('.chat-section');
    if (text === 'about')    target = document.querySelector('.about');

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── "Start Chat" hero button scrolls to chat ──
const heroBtn = document.querySelector('.hero button');
if (heroBtn) {
  heroBtn.addEventListener('click', () => {
    document.querySelector('.chat-section').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.querySelector('.input-area input').focus(), 600);
  });
}

// ══════════════════════════════════════════
//  Chat Logic
// ══════════════════════════════════════════

const messagesDiv = document.querySelector('.messages');
const chatInput   = document.querySelector('.input-area input');
const sendBtn     = document.querySelector('.input-area button');

// ── Bot responses ──────────────────────────
const botResponses = [
  { keywords: ['hello', 'hi', 'hey', 'salam', 'hye'],
    reply: "Hey there! I'm Hazim Bot. How can I help you today?" },

  { keywords: ['how are you', 'how r u', 'apa khabar'],
    reply: "I'm doing great, thanks for asking! Ready to help you." },

  { keywords: ['what is your name', 'who are you', 'nama kamu'],
    reply: "I'm Hazim Bot — your friendly AI assistant!" },

  { keywords: ['help', 'tolong', 'assist'],
    reply: "Sure! I can answer questions, have a chat, or just keep you company. What do you need?" },

  { keywords: ['feature', 'what can you do', 'capabilities'],
    reply: "I can respond to messages, answer questions, and chat with you! Check the Features section for more info." },

  { keywords: ['bye', 'goodbye', 'see you', 'tata'],
    reply: "Goodbye! Come back anytime. Take care!" },

  { keywords: ['thank', 'thanks', 'terima kasih'],
    reply: "You're welcome! Happy to help anytime." },

  { keywords: ['joke', 'lawak', 'funny'],
    reply: "Why do programmers prefer dark mode? Because light attracts bugs!" },

  { keywords: ['time', 'masa', 'pukul'],
    reply: `The current time is ${new Date().toLocaleTimeString()}.` },

  { keywords: ['date', 'today', 'hari ini', 'tarikh'],
    reply: `Today is ${new Date().toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.` },

  { keywords: ['hazim'],
    reply: "Yes, that's my name! Hazim Bot — built to help, chat, and assist." },

  { keywords: ['weather', 'cuaca'],
    reply: "I don't have live weather data, but I hope it's sunny where you are!" },

  { keywords: ['study', 'belajar', 'school', 'university', 'college'],
    reply: "Keep it up! Studying is tough but worth it. Take breaks, stay hydrated, and you've got this!" },

  { keywords: ['food', 'makan', 'hungry', 'lapar'],
    reply: "I recommend nasi lemak. Best decision you'll make today." },

  { keywords: ['bored', 'boring', 'nothing to do', 'bosan'],
    reply: "Try learning something new, go for a walk, or just chat with me! I'm always here." },
];

function getBotReply(userText) {
  const lower = userText.toLowerCase();
  for (const item of botResponses) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      return item.reply;
    }
  }
  const fallbacks = [
    "Hmm, I'm not sure about that one. Try asking something else!",
    "Interesting question! I don't have an answer for that yet.",
    "I'm still learning! Could you rephrase that?",
    "Good question — but that's outside my knowledge for now. Ask me something else!",
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ── Append message bubble ──────────────────
function appendMessage(text, sender) {
  const wrap = document.createElement('div');
  wrap.classList.add('message', sender);

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;

  wrap.appendChild(bubble);
  messagesDiv.appendChild(wrap);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ── Typing indicator ───────────────────────
function showTyping() {
  const wrap = document.createElement('div');
  wrap.classList.add('message', 'bot', 'typing-indicator');
  wrap.id = 'typingIndicator';

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.innerHTML = '<span></span><span></span><span></span>';

  wrap.appendChild(bubble);
  messagesDiv.appendChild(wrap);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

// ── Send message ───────────────────────────
function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  chatInput.value = '';

  showTyping();
  const delay = 800 + Math.random() * 700;

  setTimeout(() => {
    removeTyping();
    appendMessage(getBotReply(text), 'bot');
  }, delay);
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

// ── Welcome message on load ────────────────
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    appendMessage("Hi! I'm Hazim Bot. Type a message to get started!", 'bot');
  }, 600);
});

// ══════════════════════════════════════════
//  Active nav highlight on scroll
// ══════════════════════════════════════════

const sections = [
  { el: document.querySelector('.hero'),         link: 'Home' },
  { el: document.querySelector('.features'),     link: 'Features' },
  { el: document.querySelector('.chat-section'), link: 'Chat' },
  { el: document.querySelector('.about'),        link: 'About' },
];

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  let current = sections[0].link;

  for (const s of sections) {
    if (s.el && s.el.offsetTop <= scrollY) {
      current = s.link;
    }
  }

  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.textContent.trim() === current);
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();