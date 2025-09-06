<template>
  <div class="portfolio-page">
    <!-- Top Navigation Bar -->
    <nav class="top-nav">
      <div class="nav-left">
        <div class="logo">Community</div>
        <div class="nav-links">
          <a href="#" class="nav-link">Design resources</a>
          <a href="#" class="nav-link">Websites</a>
          <a href="#" class="nav-link">Figma Make <span class="badge">New</span></a>
          <a href="#" class="nav-link active">Plugins</a>
          <a href="#" class="nav-link">Whiteboarding</a>
          <a href="#" class="nav-link">Presentations</a>
        </div>
      </div>
      <div class="nav-right">
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search" />
        </div>
        <a href="#" class="nav-link">Log in</a>
        <button class="signup-btn">Sign up</button>
      </div>
    </nav>

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <i class="fas fa-home"></i>
      <span>></span>
      <span>Plugins</span>
    </div>

    <!-- Main Content -->
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1>Plugins</h1>
        <p>Extend your design capabilities with tools created by the community.</p>
      </div>

      <!-- Featured Plugins Section -->
      <section class="featured-section">
        <h2>Featured plugins</h2>
        <div class="tabs">
          <button class="tab active">Trending</button>
          <button class="tab">Most popular</button>
          <button class="tab">Free plugins</button>
        </div>
        
        <div class="featured-grid">
          <div class="plugin-card" v-for="plugin in featuredPlugins" :key="plugin.id">
            <div class="plugin-thumbnail">
              <img :src="plugin.thumbnail" :alt="plugin.title" />
            </div>
            <div class="plugin-info">
              <div class="plugin-header">
                <h3 class="plugin-title">{{ plugin.title }}</h3>
                <span class="plugin-status" v-if="plugin.status">{{ plugin.status }}</span>
              </div>
              <div class="plugin-stats">
                <span class="stat">
                  <i class="fas fa-heart"></i>
                  {{ plugin.likes }}
                </span>
                <span class="stat">
                  <i class="fas fa-user"></i>
                  {{ plugin.users }}
                </span>
              </div>
              <p class="plugin-description">{{ plugin.description }}</p>
              <router-link :to="`/app/app${plugin.id}`" class="try-button">Try it out</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories-section">
        <h2>Explore plugins by category</h2>
        <div class="categories-grid">
          <div class="category-card" v-for="category in categories" :key="category.id">
            <div class="category-content">
              <div class="category-info">
                <h3>{{ category.title }}</h3>
                <p>{{ category.description }}</p>
              </div>
              <div class="category-icon">
                <img :src="category.icon" :alt="category.title" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- All Plugins Section -->
      <section class="all-plugins-section">
        <div class="section-header">
          <h2>All plugins</h2>
          <div class="filters">
            <select class="filter-select">
              <option>Filter by</option>
            </select>
            <select class="filter-select">
              <option>All products</option>
            </select>
            <select class="filter-select">
              <option>Paid + free</option>
            </select>
            <select class="filter-select">
              <option>Popular</option>
            </select>
          </div>
        </div>
        
        <div class="all-plugins-list">
          <div class="plugin-item" v-for="plugin in allPlugins" :key="plugin.id">
            <div class="plugin-thumbnail-small">
              <img :src="plugin.thumbnail" :alt="plugin.title" />
            </div>
            <div class="plugin-details">
              <div class="plugin-header">
                <h3 class="plugin-title">{{ plugin.title }}</h3>
                <span class="plugin-status" v-if="plugin.status">{{ plugin.status }}</span>
              </div>
              <div class="plugin-stats">
                <span class="stat">
                  <i class="fas fa-heart"></i>
                  {{ plugin.likes }}
                </span>
                <span class="stat">
                  <i class="fas fa-user"></i>
                  {{ plugin.users }}
                </span>
              </div>
              <p class="plugin-description">{{ plugin.description }}</p>
              <router-link :to="`/app/app${plugin.id}`" class="try-button">Try it out</router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const featuredPlugins = ref([
  {
    id: 1,
    title: "App One",
    status: "Paid",
    likes: "9",
    users: "82",
    description: "Rebuild a text table from a screenshot, with your components",
    thumbnail: "/src/assets/app1-thumb.png"
  },
  {
    id: 2,
    title: "App Two",
    status: "Paid",
    likes: "27.3k",
    users: "1.7m",
    description: "Convert any website into fully editable Figma designs",
    thumbnail: "/src/assets/app2-thumb.png"
  },
  {
    id: 3,
    title: "App Three",
    status: "Paid",
    likes: "12.2k",
    users: "963k",
    description: "Automagically draw flow arrows! Create user flows and diagrams in a hand-drawn or minimalist style.",
    thumbnail: "/src/assets/app3-thumb.png"
  },
  {
    id: 4,
    title: "App Four",
    status: "Paid",
    likes: "9",
    users: "200",
    description: "Your Mind Maps, Now in Figma - Seamless Import & Export",
    thumbnail: "/src/assets/app4-thumb.png"
  },
  {
    id: 5,
    title: "App Five",
    status: "Paid",
    likes: "8.1k",
    users: "985k",
    description: "Curve your text upward, downward or into a circle",
    thumbnail: "/src/assets/app5-thumb.png"
  },
  {
    id: 6,
    title: "App Six",
    status: "Paid",
    likes: "4.4k",
    users: "494k",
    description: "Effortlessly generate wireframe designs using AI",
    thumbnail: "/src/assets/app6-thumb.png"
  }
])

const categories = ref([
  {
    id: 1,
    title: "App Seven",
    description: "Contrast check, spell check",
    icon: "/src/assets/app7-thumb.png"
  },
  {
    id: 2,
    title: "App Eight",
    description: "Tidy your files",
    icon: "/src/assets/app8-thumb.png"
  },
  {
    id: 3,
    title: "App Nine",
    description: "Shadows, textures, and much more",
    icon: "/src/assets/app9-thumb.png"
  },
  {
    id: 4,
    title: "App Ten",
    description: "Compress images, export as gif, and more",
    icon: "/src/assets/app10-thumb.png"
  },
  {
    id: 5,
    title: "App Eleven",
    description: "Turn designs into code",
    icon: "/src/assets/app11-thumb.png"
  },
  {
    id: 6,
    title: "App Twelve",
    description: "Create even higher fidelity animations",
    icon: "/src/assets/app12-thumb.png"
  }
])

const allPlugins = ref([
  {
    id: 1,
    title: "App Thirteen",
    likes: "28.7k",
    users: "3.8m",
    description: "All popular open source icon sets in one plugin. Emojis too.",
    thumbnail: "/src/assets/app13-thumb.png"
  },
  {
    id: 2,
    title: "App Fourteen",
    likes: "6.7k",
    users: "2m",
    description: "Code Conversion Made Easy: Figma to Web & Apps",
    thumbnail: "/src/assets/app14-thumb.png"
  },
  {
    id: 3,
    title: "App Fifteen",
    likes: "27.3k",
    users: "1.7m",
    description: "Convert any website into fully editable Figma designs",
    thumbnail: "/src/assets/app15-thumb.png"
  },
  {
    id: 4,
    title: "App Sixteen",
    likes: "27.6k",
    users: "3.2m",
    description: "Insert beautiful images from Unsplash into your designs.",
    thumbnail: "/src/assets/app16-thumb.png"
  },
  {
    id: 5,
    title: "App Seventeen",
    status: "Paid",
    likes: "8.1k",
    users: "1.8m",
    description: "All our graphics at your fingertips.",
    thumbnail: "/src/assets/app17-thumb.png"
  },
  {
    id: 6,
    title: "App Eighteen",
    likes: "13.7k",
    users: "1.6m",
    description: "Code Conversion Made Easy: Figma to Web & Apps",
    thumbnail: "/src/assets/app18-thumb.png"
  }
])
</script>

<style scoped>
/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.portfolio-page {
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
  padding: 16px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.nav-links {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: #111827;
}

.nav-link.active {
  color: #111827;
}

.badge {
  background-color: #f59e0b;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 4px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar i {
  position: absolute;
  left: 12px;
  color: #9ca3af;
  font-size: 14px;
}

.search-bar input {
  padding: 8px 12px 8px 36px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  width: 200px;
  background-color: #f9fafb;
}

.search-bar input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #ffffff;
}

.signup-btn {
  background-color: #111827;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.signup-btn:hover {
  background-color: #374151;
}

/* Breadcrumb */
.breadcrumb {
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
}

.breadcrumb i {
  font-size: 16px;
}

/* Container */
.container {
  max-width: 1624px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Page Header */
.page-header {
  padding: 40px 0;
  text-align: left;
}

.page-header h1 {
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px 0;
  line-height: 1.1;
}

.page-header p {
  font-size: 18px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Featured Plugins Section */
.featured-section {
  margin-bottom: 80px;
}

.featured-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
}

.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 32px;
  border-bottom: 1px solid #e5e7eb;
}

.tab {
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  color: #6b7280;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab:hover {
  color: #111827;
}

.tab.active {
  color: #111827;
  border-bottom-color: #111827;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.plugin-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
  align-items: flex-start;
}

.plugin-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.plugin-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plugin-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plugin-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.plugin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.plugin-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 2.6em; /* 2 lines * 1.3 line-height */
}

.plugin-status {
  background-color: #f3f4f6;
  color: #374151;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.plugin-stats {
  display: flex;
  gap: 16px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #6b7280;
}

.stat i {
  font-size: 12px;
}

.plugin-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 2.8em; /* 2 lines * 1.4 line-height */
}

.try-button {
  background-color: #ffffff;
  color: #111827;
  border: 1px solid #111827;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
  margin-top: auto;
  text-decoration: none;
  display: inline-block;
}

.try-button:hover {
  background-color: #111827;
  color: #ffffff;
}

/* Categories Section */
.categories-section {
  margin-bottom: 80px;
}

.categories-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 32px 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;
}

.category-card {
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 24px;
  transition: all 0.2s ease;
  height: 120px;
}

.category-card:hover {
  background-color: #f3f4f6;
}

.category-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.category-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-info p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* All Plugins Section */
.all-plugins-section {
  margin-bottom: 80px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.filters {
  display: flex;
  gap: 16px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  background-color: #ffffff;
  cursor: pointer;
}

.all-plugins-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.plugin-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
  align-items: flex-start;
}

.plugin-item:hover {
  border-color: #d1d5db;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.plugin-thumbnail-small {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plugin-thumbnail-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plugin-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.plugin-details .plugin-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 2.6em; /* 2 lines * 1.3 line-height */
}

.plugin-details .plugin-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 2.8em; /* 2 lines * 1.4 line-height */
}

/* Responsive Design */

@media (max-width: 1024px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
  
  .nav-links {
    display: none;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .page-header h1 {
    font-size: 36px;
  }
  
  .featured-section h2,
  .categories-section h2,
  .section-header h2 {
    font-size: 24px;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .filters {
    flex-wrap: wrap;
  }
}
</style>
