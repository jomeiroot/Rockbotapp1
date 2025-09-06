<template>
  <div class="app-detail-page">
    <!-- Top Navigation -->
    <div class="top-nav">
      <div class="nav-left">
        <h1>Portfolio</h1>
      </div>
      <div class="nav-right">
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Contact</a>
        <a href="#" class="nav-link">Resume</a>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <a href="/">Home</a>
      <i class="fas fa-chevron-right"></i>
      <a href="/">Apps</a>
      <i class="fas fa-chevron-right"></i>
      <span>{{ appData.name }}</span>
    </div>

    <!-- App Header -->
    <div class="app-header">
      <div class="app-info">
        <h1>{{ appData.name }}</h1>
        <p class="app-description">{{ appData.description }}</p>
        <div class="app-meta">
          <span class="app-category">{{ appData.category }}</span>
          <span class="app-year">{{ appData.year }}</span>
        </div>
      </div>
      <div class="app-image">
        <img v-if="route.params.id !== 'app1'" :src="appData.thumbnail" :alt="appData.name" />
        <div v-else class="now-playing-demo">
          <h3>Live Demo</h3>
          <NowPlaying />
        </div>
      </div>
    </div>

    <!-- Now Playing Component -->
    <div v-if="route.params.id !== 'app1'" class="now-playing-section">
      <h2>Live Demo</h2>
      <NowPlaying />
    </div>

    <!-- App Details -->
    <div class="app-details">
      <div class="detail-section">
        <h3>About this app</h3>
        <p>{{ appData.longDescription }}</p>
      </div>

      <div class="detail-section">
        <h3>Key Features</h3>
        <ul class="features-list">
          <li v-for="feature in appData.features" :key="feature">{{ feature }}</li>
        </ul>
      </div>

      <div class="detail-section">
        <h3>Technologies Used</h3>
        <div class="tech-tags">
          <span v-for="tech in appData.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
    </div>

    <!-- Author Section -->
    <div class="author-section">
      <div class="author-info">
        <img :src="appData.authorImage" :alt="appData.authorName" class="author-image" />
        <div class="author-details">
          <h3>{{ appData.authorName }}</h3>
          <p>{{ appData.authorRole }}</p>
        </div>
      </div>
      <div class="author-actions">
        <a :href="appData.githubUrl" class="action-button">
          <i class="fab fa-github action-icon"></i>
          View on GitHub
        </a>
        <span class="api-badge">{{ appData.apiType }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NowPlaying from './NowPlaying.vue'

const route = useRoute()
const appData = ref({})

// Sample app data - in a real app, this would come from an API
const appsData = {
  'app1': {
    name: 'App One',
    description: 'Rebuild a text table from a screenshot, with your components',
    longDescription: 'A powerful tool that automatically recreates text tables from screenshots using advanced image recognition and component-based architecture. Perfect for designers who need to quickly convert visual table data into editable components.',
    category: 'Design Tools',
    year: '2024',
    thumbnail: '/src/assets/app1-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app1-headshot.png',
    githubUrl: 'https://github.com/username/app-one',
    apiType: 'Remote API',
    features: [
      'Screenshot to table conversion',
      'Component-based architecture',
      'Advanced image recognition',
      'Editable table components',
      'Export to multiple formats',
      'Real-time preview'
    ],
    technologies: ['Vue.js', 'Node.js', 'TensorFlow', 'MongoDB', 'Express']
  },
  'app2': {
    name: 'App Two',
    description: 'Convert any website into fully editable Figma designs',
    longDescription: 'Transform any website into fully editable Figma designs with perfect pixel accuracy. This powerful tool automatically extracts HTML, CSS, and JavaScript to create clean, organized Figma components that maintain the original design integrity.',
    category: 'Design Tools',
    year: '2024',
    thumbnail: '/src/assets/app2-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app2-headshot.png',
    githubUrl: 'https://github.com/username/app-two',
    apiType: 'Remote API',
    features: [
      'Website to Figma conversion',
      'Pixel-perfect accuracy',
      'Component extraction',
      'CSS parsing',
      'Interactive elements',
      'Batch processing'
    ],
    technologies: ['React', 'Python', 'Figma API', 'BeautifulSoup', 'Selenium']
  },
  'app3': {
    name: 'App Three',
    description: 'Automagically draw flow arrows! Create user flows and diagrams in a hand-drawn or minimalist style.',
    longDescription: 'An intelligent flow diagram generator that automatically creates beautiful user flows and process diagrams. Choose from hand-drawn or minimalist styles to match your design aesthetic.',
    category: 'Design Tools',
    year: '2024',
    thumbnail: '/src/assets/app3-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app3-headshot.png',
    githubUrl: 'https://github.com/username/app-three',
    apiType: 'Remote API',
    features: [
      'Automatic flow generation',
      'Hand-drawn style options',
      'Minimalist design mode',
      'Smart arrow placement',
      'Customizable templates',
      'Export capabilities'
    ],
    technologies: ['Vue.js', 'Canvas API', 'SVG', 'Node.js', 'Express']
  },
  'app4': {
    name: 'App Four',
    description: 'Your Mind Maps, Now in Figma - Seamless Import & Export',
    longDescription: 'Seamlessly import and export mind maps to and from Figma. Create beautiful, organized mind maps directly in your design workflow with full integration capabilities.',
    category: 'Productivity',
    year: '2024',
    thumbnail: '/src/assets/app4-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app4-headshot.png',
    githubUrl: 'https://github.com/username/app-four',
    apiType: 'Remote API',
    features: [
      'Mind map creation',
      'Figma integration',
      'Import/Export functionality',
      'Collaborative editing',
      'Template library',
      'Real-time sync'
    ],
    technologies: ['React', 'Figma API', 'WebSocket', 'MongoDB', 'Node.js']
  },
  'app5': {
    name: 'App Five',
    description: 'Curve your text upward, downward or into a circle',
    longDescription: 'Advanced text manipulation tool that allows you to curve text in any direction with precision control. Perfect for creating logos, banners, and decorative text elements.',
    category: 'Typography',
    year: '2024',
    thumbnail: '/src/assets/app5-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app5-headshot.png',
    githubUrl: 'https://github.com/username/app-five',
    apiType: 'Remote API',
    features: [
      'Text curving controls',
      'Multiple curve types',
      'Precision adjustment',
      'Real-time preview',
      'Export options',
      'Custom shapes'
    ],
    technologies: ['Vue.js', 'Canvas API', 'SVG', 'TypeScript', 'Node.js']
  },
  'app6': {
    name: 'App Six',
    description: 'Effortlessly generate wireframe designs using AI',
    longDescription: 'AI-powered wireframe generator that creates professional wireframes based on your requirements. Simply describe what you need and watch as the AI generates clean, organized wireframes.',
    category: 'AI Tools',
    year: '2024',
    thumbnail: '/src/assets/app6-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app6-headshot.png',
    githubUrl: 'https://github.com/username/app-six',
    apiType: 'Remote API',
    features: [
      'AI-powered generation',
      'Natural language input',
      'Multiple wireframe styles',
      'Component library',
      'Export to Figma',
      'Custom templates'
    ],
    technologies: ['React', 'OpenAI API', 'Figma API', 'Python', 'FastAPI']
  },
  'app7': {
    name: 'App Seven',
    description: 'Contrast check, spell check',
    longDescription: 'Comprehensive accessibility tool that checks color contrast ratios and spelling errors in your designs. Ensure your designs meet WCAG guidelines and are accessible to all users.',
    category: 'Accessibility',
    year: '2024',
    thumbnail: '/src/assets/app7-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app7-headshot.png',
    githubUrl: 'https://github.com/username/app-seven',
    apiType: 'Remote API',
    features: [
      'Color contrast analysis',
      'Spell checking',
      'WCAG compliance',
      'Accessibility scoring',
      'Real-time feedback',
      'Bulk checking'
    ],
    technologies: ['Vue.js', 'Color.js', 'Hunspell', 'Node.js', 'Express']
  },
  'app8': {
    name: 'App Eight',
    description: 'Tidy your files',
    longDescription: 'Smart file organization tool that automatically sorts and organizes your design files. Keep your workspace clean and find files instantly with intelligent categorization.',
    category: 'Organization',
    year: '2024',
    thumbnail: '/src/assets/app8-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app8-headshot.png',
    githubUrl: 'https://github.com/username/app-eight',
    apiType: 'Remote API',
    features: [
      'Automatic file sorting',
      'Smart categorization',
      'Duplicate detection',
      'Batch operations',
      'Custom rules',
      'Search functionality'
    ],
    technologies: ['React', 'Node.js', 'File System API', 'MongoDB', 'Express']
  },
  'app9': {
    name: 'App Nine',
    description: 'Shadows, textures, and much more',
    longDescription: 'Advanced effects library for creating stunning visual effects. Add realistic shadows, textures, and other effects to enhance your designs with professional-quality results.',
    category: 'Effects',
    year: '2024',
    thumbnail: '/src/assets/app9-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app9-headshot.png',
    githubUrl: 'https://github.com/username/app-nine',
    apiType: 'Remote API',
    features: [
      'Shadow effects',
      'Texture library',
      'Blend modes',
      'Custom effects',
      'Real-time preview',
      'Export options'
    ],
    technologies: ['Vue.js', 'WebGL', 'Canvas API', 'Node.js', 'Express']
  },
  'app10': {
    name: 'App Ten',
    description: 'Compress images, export as gif, and more',
    longDescription: 'Comprehensive image processing tool that handles compression, format conversion, and optimization. Perfect for preparing images for web and print with maximum quality and minimal file size.',
    category: 'Image Processing',
    year: '2024',
    thumbnail: '/src/assets/app10-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app10-headshot.png',
    githubUrl: 'https://github.com/username/app-ten',
    apiType: 'Remote API',
    features: [
      'Image compression',
      'Format conversion',
      'GIF creation',
      'Batch processing',
      'Quality optimization',
      'Preview tools'
    ],
    technologies: ['React', 'Sharp', 'FFmpeg', 'Node.js', 'Express']
  },
  'app11': {
    name: 'App Eleven',
    description: 'Turn designs into code',
    longDescription: 'Advanced code generation tool that converts Figma designs into clean, production-ready code. Supports multiple frameworks and generates responsive, accessible code.',
    category: 'Development',
    year: '2024',
    thumbnail: '/src/assets/app11-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app11-headshot.png',
    githubUrl: 'https://github.com/username/app-eleven',
    apiType: 'Remote API',
    features: [
      'Figma to code conversion',
      'Multiple frameworks',
      'Responsive design',
      'Clean code generation',
      'Component extraction',
      'Export options'
    ],
    technologies: ['Vue.js', 'Figma API', 'TypeScript', 'Node.js', 'Express']
  },
  'app12': {
    name: 'App Twelve',
    description: 'Create even higher fidelity animations',
    longDescription: 'Professional animation tool for creating high-fidelity, smooth animations in Figma. Bring your designs to life with advanced animation controls and timeline editing.',
    category: 'Animation',
    year: '2024',
    thumbnail: '/src/assets/app12-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app12-headshot.png',
    githubUrl: 'https://github.com/username/app-twelve',
    apiType: 'Remote API',
    features: [
      'High-fidelity animations',
      'Timeline editor',
      'Easing controls',
      'Keyframe animation',
      'Export capabilities',
      'Performance optimization'
    ],
    technologies: ['React', 'Figma API', 'WebGL', 'Node.js', 'Express']
  },
  'app13': {
    name: 'App Thirteen',
    description: 'All popular open source icon sets in one plugin. Emojis too.',
    longDescription: 'Comprehensive icon library that brings together all popular open source icon sets in one convenient plugin. Includes emojis and supports custom icon uploads.',
    category: 'Icons',
    year: '2024',
    thumbnail: '/src/assets/app13-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app13-headshot.png',
    githubUrl: 'https://github.com/username/app-thirteen',
    apiType: 'Remote API',
    features: [
      'Icon library access',
      'Emoji support',
      'Custom uploads',
      'Search functionality',
      'Multiple formats',
      'Batch operations'
    ],
    technologies: ['Vue.js', 'Iconify API', 'Node.js', 'MongoDB', 'Express']
  },
  'app14': {
    name: 'App Fourteen',
    description: 'Code Conversion Made Easy: Figma to Web & Apps',
    longDescription: 'Streamlined code conversion tool that transforms Figma designs into production-ready code for web and mobile applications. Supports multiple frameworks and platforms.',
    category: 'Development',
    year: '2024',
    thumbnail: '/src/assets/app14-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app14-headshot.png',
    githubUrl: 'https://github.com/username/app-fourteen',
    apiType: 'Remote API',
    features: [
      'Multi-platform support',
      'Framework compatibility',
      'Clean code output',
      'Component generation',
      'Style extraction',
      'Export options'
    ],
    technologies: ['React', 'Figma API', 'TypeScript', 'Node.js', 'Express']
  },
  'app15': {
    name: 'App Fifteen',
    description: 'Convert any website into fully editable Figma designs',
    longDescription: 'Advanced web scraping and conversion tool that transforms any website into fully editable Figma designs. Maintains design fidelity while creating organized, editable components.',
    category: 'Design Tools',
    year: '2024',
    thumbnail: '/src/assets/app15-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app15-headshot.png',
    githubUrl: 'https://github.com/username/app-fifteen',
    apiType: 'Remote API',
    features: [
      'Website scraping',
      'Figma conversion',
      'Component organization',
      'Style preservation',
      'Interactive elements',
      'Batch processing'
    ],
    technologies: ['React', 'Puppeteer', 'Figma API', 'Node.js', 'Express']
  },
  'app16': {
    name: 'App Sixteen',
    description: 'Insert beautiful images from Unsplash into your designs.',
    longDescription: 'Seamless integration with Unsplash to bring beautiful, high-quality images directly into your Figma designs. Search, preview, and insert images without leaving your design workflow.',
    category: 'Images',
    year: '2024',
    thumbnail: '/src/assets/app16-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app16-headshot.png',
    githubUrl: 'https://github.com/username/app-sixteen',
    apiType: 'Remote API',
    features: [
      'Unsplash integration',
      'Image search',
      'High-quality images',
      'Preview functionality',
      'Direct insertion',
      'Attribution handling'
    ],
    technologies: ['Vue.js', 'Unsplash API', 'Figma API', 'Node.js', 'Express']
  },
  'app17': {
    name: 'App Seventeen',
    description: 'All our graphics at your fingertips.',
    longDescription: 'Comprehensive graphics library featuring icons, illustrations, and photos. Access thousands of professional graphics directly in your design workflow with easy search and categorization.',
    category: 'Graphics',
    year: '2024',
    thumbnail: '/src/assets/app17-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app17-headshot.png',
    githubUrl: 'https://github.com/username/app-seventeen',
    apiType: 'Remote API',
    features: [
      'Graphics library',
      'Icon collection',
      'Illustration library',
      'Photo gallery',
      'Search and filter',
      'Direct insertion'
    ],
    technologies: ['React', 'Icons8 API', 'Figma API', 'Node.js', 'Express']
  },
  'app18': {
    name: 'App Eighteen',
    description: 'Code Conversion Made Easy: Figma to Web & Apps',
    longDescription: 'Advanced code generation platform that converts Figma designs into production-ready code for React, HTML, CSS, Tailwind, and MUI. Includes DevMode inspection capabilities.',
    category: 'Development',
    year: '2024',
    thumbnail: '/src/assets/app18-thumb.png',
    authorName: 'Jomei',
    authorRole: 'Lead Developer',
    authorImage: '/src/assets/app18-headshot.png',
    githubUrl: 'https://github.com/username/app-eighteen',
    apiType: 'Remote API',
    features: [
      'Multi-framework support',
      'DevMode inspection',
      'React components',
      'Tailwind CSS',
      'MUI integration',
      'Code optimization'
    ],
    technologies: ['React', 'Figma API', 'TypeScript', 'Node.js', 'Express']
  }
}

onMounted(() => {
  const appId = route.params.id
  appData.value = appsData[appId] || appsData['app1'] // fallback to app1
})
</script>

<style scoped>
/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.app-detail-page {
  min-height: 100vh;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #374151;
  width: 100%;
}

/* Top Navigation */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.nav-left h1 {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.nav-right {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #111827;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  font-size: 14px;
  color: #6b7280;
}

.breadcrumb a {
  color: #6b7280;
  text-decoration: none;
}

.breadcrumb a:hover {
  color: #111827;
}

.breadcrumb i {
  font-size: 12px;
}

/* App Header */
.app-header {
  display: flex;
  gap: 48px;
  padding: 48px 24px;
  max-width: 1624px;
  margin: 0 auto;
}

.app-info {
  flex: 1;
}

.app-info h1 {
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px 0;
  line-height: 1.1;
}

.app-description {
  font-size: 20px;
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.app-meta {
  display: flex;
  gap: 16px;
}

.app-category, .app-year {
  background: #f3f4f6;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.app-image {
  flex: 0 0 400px;
}

.app-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.now-playing-demo {
  width: 100%;
  max-width: 600px;
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.now-playing-demo h3 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
  text-align: center;
}

/* Now Playing Section */
.now-playing-section {
  padding: 48px 24px;
  max-width: 1624px;
  margin: 0 auto;
  border-top: 1px solid #e5e7eb;
}

.now-playing-section h2 {
  font-size: 32px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 32px 0;
}

/* App Details */
.app-details {
  padding: 48px 24px;
  max-width: 1624px;
  margin: 0 auto;
  border-top: 1px solid #e5e7eb;
}

.detail-section {
  margin-bottom: 48px;
}

.detail-section h3 {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
}

.detail-section p {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding: 8px 0;
  color: #6b7280;
  position: relative;
  padding-left: 24px;
}

.features-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  background: #dbeafe;
  color: #1e40af;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
}

/* Author Section */
.author-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 48px 24px;
  max-width: 1624px;
  margin: 0 auto;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.author-details h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.author-details p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.author-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #111827;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.action-button:hover {
  background: #374151;
}

.action-icon {
  font-size: 16px;
}

.api-badge {
  background: #dcfce7;
  color: #166534;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .app-header {
    flex-direction: column;
    gap: 32px;
  }
  
  .app-image {
    flex: none;
  }
  
  .author-section {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
}
</style>
