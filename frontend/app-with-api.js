// Application Data - Ledo Sports Academy with API Integration
let appData = {
  heroSlides: [],
  activities: [],
  members: [],
  donations: [],
  expenses: [],
  experiences: [],
  weeklyFees: [],
  gallery: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initApp();
});

async function initApp() {
  try {
    // Load all data from API
    await loadAllData();
    
    // Initialize UI components
    initNavigation();
    initAdminLogin();
    renderAllSections();
    
    // Show home section by default
    showSection('home');
    
    // Initialize form handlers
    initFormHandlers();
    
    showMessage('Application initialized successfully!', 'success');
  } catch (error) {
    console.error('Error initializing app:', error);
    showMessage('Failed to initialize application. Please check console for details.', 'error');
  }
}

// Initialize form handlers
function initFormHandlers() {
  // Activity form
  const activityForm = document.getElementById('activityForm');
  if (activityForm) {
    activityForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(activityForm);
      const activityData = {
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        image: formData.get('image') || 'https://placehold.co/600x400?text=Activity',
        ctaText: formData.get('ctaText') || 'Learn More',
        ctaLink: formData.get('ctaLink') || '#'
      };
      
      const activityId = formData.get('activityId');
      if (activityId) {
        // Update existing activity
        await updateActivity(activityId, activityData);
      } else {
        // Add new activity
        await addActivity(activityData);
      }
      
      activityForm.reset();
      document.getElementById('activityFormContainer').classList.add('hidden');
    });
  }
  
  // Member form
  const memberForm = document.getElementById('memberForm');
  if (memberForm) {
    memberForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(memberForm);
      const memberData = {
        name: formData.get('name'),
        role: formData.get('role'),
        contact: formData.get('contact'),
        phone: formData.get('phone'),
        joinDate: formData.get('joinDate'),
        image: formData.get('image') || 'https://placehold.co/300x300?text=Member'
      };
      
      const memberId = formData.get('memberId');
      if (memberId) {
        // Update existing member
        await updateMember(memberId, memberData);
      } else {
        // Add new member
        await addMember(memberData);
      }
      
      memberForm.reset();
      document.getElementById('memberFormContainer').classList.add('hidden');
    });
  }
  
  // Donation form
  const donationForm = document.getElementById('donationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(donationForm);
      const donationData = {
        donor: formData.get('donor'),
        amount: parseFloat(formData.get('amount')),
        date: formData.get('date'),
        purpose: formData.get('purpose'),
        contact: formData.get('contact')
      };
      
      const donationId = formData.get('donationId');
      if (donationId) {
        // Update existing donation
        await updateDonation(donationId, donationData);
      } else {
        // Add new donation
        await addDonation(donationData);
      }
      
      donationForm.reset();
      document.getElementById('donationFormContainer').classList.add('hidden');
    });
  }
  
  // Expense form
  const expenseForm = document.getElementById('expenseForm');
  if (expenseForm) {
    expenseForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(expenseForm);
      const expenseData = {
        title: formData.get('title'),
        amount: parseFloat(formData.get('amount')),
        date: formData.get('date'),
        category: formData.get('category'),
        description: formData.get('description')
      };
      
      const expenseId = formData.get('expenseId');
      if (expenseId) {
        // Update existing expense
        await updateExpense(expenseId, expenseData);
      } else {
        // Add new expense
        await addExpense(expenseData);
      }
      
      expenseForm.reset();
      document.getElementById('expenseFormContainer').classList.add('hidden');
    });
  }
  
  // Experience form
  const experienceForm = document.getElementById('experienceForm');
  if (experienceForm) {
    experienceForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(experienceForm);
      const experienceData = {
        name: formData.get('name'),
        testimonial: formData.get('testimonial'),
        rating: parseInt(formData.get('rating')),
        date: formData.get('date'),
        image: formData.get('image') || 'https://placehold.co/300x300?text=Experience'
      };
      
      const experienceId = formData.get('experienceId');
      if (experienceId) {
        // Update existing experience
        await updateExperience(experienceId, experienceData);
      } else {
        // Add new experience
        await addExperience(experienceData);
      }
      
      experienceForm.reset();
      document.getElementById('experienceFormContainer').classList.add('hidden');
    });
  }
  
  // Weekly fee form
  const weeklyFeeForm = document.getElementById('weeklyFeeForm');
  if (weeklyFeeForm) {
    weeklyFeeForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(weeklyFeeForm);
      const weeklyFeeData = {
        member: formData.get('member'),
        amount: parseFloat(formData.get('amount')),
        date: formData.get('date'),
        status: formData.get('status'),
        notes: formData.get('notes')
      };
      
      const weeklyFeeId = formData.get('weeklyFeeId');
      if (weeklyFeeId) {
        // Update existing weekly fee
        await updateWeeklyFee(weeklyFeeId, weeklyFeeData);
      } else {
        // Add new weekly fee
        await addWeeklyFee(weeklyFeeData);
      }
      
      weeklyFeeForm.reset();
      document.getElementById('weeklyFeeFormContainer').classList.add('hidden');
    });
  }
  
  // Gallery form
  const galleryForm = document.getElementById('galleryForm');
  if (galleryForm) {
    galleryForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(galleryForm);
      const galleryData = {
        title: formData.get('title'),
        description: formData.get('description'),
        image: formData.get('image') || 'https://placehold.co/600x400?text=Gallery',
        date: formData.get('date'),
        category: formData.get('category')
      };
      
      const galleryId = formData.get('galleryId');
      if (galleryId) {
        // Update existing gallery item
        await updateGalleryItem(galleryId, galleryData);
      } else {
        // Add new gallery item
        await addGalleryItem(galleryData);
      }
      
      galleryForm.reset();
      document.getElementById('galleryFormContainer').classList.add('hidden');
    });
  }
  
  // Hero form
  const heroForm = document.getElementById('heroForm');
  if (heroForm) {
    heroForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(heroForm);
      const heroData = {
        title: formData.get('title'),
        subtitle: formData.get('subtitle'),
        image: formData.get('image') || 'https://placehold.co/1200x600?text=Hero',
        ctaText: formData.get('ctaText') || 'Learn More',
        ctaLink: formData.get('ctaLink') || '#'
      };
      
      const heroId = formData.get('heroId');
      if (heroId) {
        // Update existing hero slide
        await updateHeroSlide(heroId, heroData);
      } else {
        // Add new hero slide
        await addHeroSlide(heroData);
      }
      
      heroForm.reset();
      document.getElementById('heroFormContainer').classList.add('hidden');
    });
  }
  
  console.log('Form handlers initialized');
}

// Initialize navigation
function initNavigation() {
  // Set up navigation event listeners
  document.addEventListener('click', function(e) {
    // Handle navigation links
    if (e.target.classList.contains('nav-link') && !e.target.classList.contains('mobile-admin-login') && !e.target.classList.contains('mobile-admin-logout')) {
      e.preventDefault();
      e.stopPropagation();
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = href.substring(1);
        console.log('Navigating to section:', target);
        showSection(target);
        setActiveNavLink(e.target);
      }
    }
  });
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const nav = document.getElementById('nav');
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }
  
  console.log('Navigation initialized');
}

// Set active navigation link
function setActiveNavLink(activeLink) {
  const navLinks = document.querySelectorAll('.nav-link:not(.mobile-admin-login):not(.mobile-admin-logout)');
  navLinks.forEach(function(link) {
    link.classList.remove('active');
  });
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Initialize admin login functionality
function initAdminLogin() {
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');
  const mobileAdminLogin = document.getElementById('mobileAdminLogin');
  const mobileAdminLogout = document.getElementById('mobileAdminLogout');
  
  // Show login buttons
  if (adminLoginBtn) adminLoginBtn.classList.remove('hidden');
  if (mobileAdminLogin) mobileAdminLogin.classList.remove('hidden');
  
  // Check if already logged in
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (isAdmin) {
    setAdminMode(true);
  }
  
  // Desktop login button
  if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', function() {
      login();
    });
  }
  
  // Mobile login button
  if (mobileAdminLogin) {
    mobileAdminLogin.addEventListener('click', function(e) {
      e.preventDefault();
      login();
    });
  }
  
  // Desktop logout button
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', function() {
      logout();
    });
  }
  
  // Mobile logout button
  if (mobileAdminLogout) {
    mobileAdminLogout.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
  
  console.log('Admin login initialized');
}

// Login function
function login() {
  const password = prompt('Enter admin password:');
  if (password === 'admin123') { // Simple password for demo purposes
    setAdminMode(true);
    localStorage.setItem('isAdmin', 'true');
    showMessage('Logged in as admin', 'success');
  } else if (password) {
    showMessage('Invalid password', 'error');
  }
}

// Logout function
function logout() {
  setAdminMode(false);
  localStorage.removeItem('isAdmin');
  showMessage('Logged out successfully', 'success');
}

// Set admin mode
function setAdminMode(isAdmin) {
  const adminElements = document.querySelectorAll('.admin-only');
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');
  const mobileAdminLogin = document.getElementById('mobileAdminLogin');
  const mobileAdminLogout = document.getElementById('mobileAdminLogout');
  
  adminElements.forEach(function(el) {
    if (isAdmin) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
  
  if (adminLoginBtn && adminLogoutBtn) {
    if (isAdmin) {
      adminLoginBtn.classList.add('hidden');
      adminLogoutBtn.classList.remove('hidden');
    } else {
      adminLoginBtn.classList.remove('hidden');
      adminLogoutBtn.classList.add('hidden');
    }
  }
  
  if (mobileAdminLogin && mobileAdminLogout) {
    if (isAdmin) {
      mobileAdminLogin.classList.add('hidden');
      mobileAdminLogout.classList.remove('hidden');
    } else {
      mobileAdminLogin.classList.remove('hidden');
      mobileAdminLogout.classList.add('hidden');
    }
  }
}

// Load all data from API
async function loadAllData() {
  try {
    // Show loading message
    showMessage('Loading data...', 'info');
    
    // Load data in parallel for better performance
    const [
      heroSlides,
      activities,
      members,
      donations,
      expenses,
      experiences,
      weeklyFees,
      gallery
    ] = await Promise.all([
      api.hero.getAll(),
      api.activity.getAll(),
      api.member.getAll(),
      api.donation.getAll(),
      api.expense.getAll(),
      api.experience.getAll(),
      api.weeklyFee.getAll(),
      api.gallery.getAll()
    ]);
    
    // Update appData with API responses
    appData.heroSlides = heroSlides;
    appData.activities = activities;
    appData.members = members;
    appData.donations = donations;
    appData.expenses = expenses;
    appData.experiences = experiences;
    appData.weeklyFees = weeklyFees;
    appData.gallery = gallery;
    
    showMessage('Data loaded successfully!', 'success');
  } catch (error) {
    console.error('Error loading data:', error);
    showMessage('Failed to load data. Please check console for details.', 'error');
    throw error;
  }
}

// Render all sections
function renderAllSections() {
  renderHeroSlides();
  renderActivities();
  renderMembers();
  renderDonations();
  renderExpenses();
  renderExperiences();
  renderWeeklyFees();
  renderGallery();
  renderTop5Gallery();
  updateDashboardMetrics();
}

// Show a specific section
function showSection(sectionId) {
  console.log('Showing section:', sectionId);
  
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(function(section) {
    section.classList.remove('active');
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    console.log('Section shown successfully:', sectionId);
    
    // Render charts when dashboard is shown
    if (sectionId === 'dashboard') {
      setTimeout(function() {
        renderCharts();
      }, 100);
    }
  } else {
    console.error('Section not found:', sectionId);
  }
}

// Show message to user
function showMessage(text, type = 'success') {
  const message = document.getElementById('message');
  const messageText = document.getElementById('messageText');
  
  if (messageText) messageText.textContent = text;
  
  if (message) {
    message.className = 'message';
    if (type === 'error') {
      message.classList.add('error');
    }
    message.classList.remove('hidden');
    
    setTimeout(function() {
      message.classList.add('hidden');
    }, 3000);
  }
  
  console.log('Message shown:', text, 'Type:', type);
}

// Hero Slides Functions
function renderHeroSlides() {
  const slidesWrapper = document.getElementById('slidesWrapper');
  const indicators = document.getElementById('slideshowIndicators');
  const heroSlidesGrid = document.getElementById('heroSlidesGrid');
  
  if (slidesWrapper && indicators) {
    slidesWrapper.innerHTML = '';
    indicators.innerHTML = '';
    
    appData.heroSlides.forEach(function(slide, index) {
      // Create slide
      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide' + (index === 0 ? ' active' : '');
      slideDiv.style.backgroundImage = 'url(' + slide.backgroundImage + ')';
      
      const slideContent = document.createElement('div');
      slideContent.className = 'slide-content';
      
      slideContent.innerHTML = 
        '<h2>' + slide.title + '</h2>' +
        '<h3>' + slide.subtitle + '</h3>' +
        '<p>' + slide.description + '</p>';
      
      const ctaButton = document.createElement('a');
      ctaButton.className = 'btn btn--primary';
      ctaButton.textContent = slide.ctaText;
      
      // Handle redirect URL if present
      if (slide.redirectUrl && slide.redirectUrl.trim() !== '') {
        ctaButton.href = slide.redirectUrl;
        if (slide.openNewTab) {
          ctaButton.target = '_blank';
          ctaButton.rel = 'noopener noreferrer';
        }
      } else {
        ctaButton.href = slide.ctaLink;
      }
      
      slideContent.appendChild(ctaButton);
      slideDiv.appendChild(slideContent);
      slidesWrapper.appendChild(slideDiv);
      
      // Create indicator
      const indicator = document.createElement('span');
      indicator.className = 'indicator' + (index === 0 ? ' active' : '');
      indicator.setAttribute('data-index', index);
      indicator.addEventListener('click', function() {
        showSlide(index);
      });
      indicators.appendChild(indicator);
    });
  }
  
  // Render hero slides grid for admin
  if (heroSlidesGrid) {
    heroSlidesGrid.innerHTML = '';
    
    appData.heroSlides.forEach(function(slide) {
      const slideCard = createHeroSlideCard(slide);
      heroSlidesGrid.appendChild(slideCard);
    });
  }
}

// Activities Functions
function renderActivities() {
  renderRecentEvents();
  renderUpcomingEvents();
  renderActivitiesGrid();
}

async function addActivity(activityData) {
  try {
    const newActivity = await api.activity.create(activityData);
    appData.activities.push(newActivity);
    renderActivities();
    showMessage('Activity added successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error adding activity:', error);
    showMessage('Failed to add activity: ' + error.message, 'error');
    return false;
  }
}

async function updateActivity(id, activityData) {
  try {
    const updatedActivity = await api.activity.update(id, activityData);
    const index = appData.activities.findIndex(a => a._id === id);
    if (index !== -1) {
      appData.activities[index] = updatedActivity;
    }
    renderActivities();
    showMessage('Activity updated successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error updating activity:', error);
    showMessage('Failed to update activity: ' + error.message, 'error');
    return false;
  }
}

async function deleteActivity(id) {
  if (!confirm('Are you sure you want to delete this activity?')) return;
  
  try {
    await api.activity.delete(id);
    appData.activities = appData.activities.filter(a => a._id !== id);
    renderActivities();
    showMessage('Activity deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting activity:', error);
    showMessage('Failed to delete activity: ' + error.message, 'error');
  }
}

// Members Functions
// Render members grid
function renderMembers() {
  const grid = document.getElementById('membersGrid');
  if (!grid) return;

  grid.innerHTML = '';

  appData.members.forEach(function(member) {
    const memberCard = createMemberCard(member);
    grid.appendChild(memberCard);
  });
}

function createMemberCard(member) {
  const card = document.createElement('div');
  card.className = 'member-card';
  card.setAttribute('data-member-name', member.name.toLowerCase());
  card.setAttribute('data-member-role', member.role.toLowerCase());
  
  const formattedDate = new Date(member.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  card.innerHTML = 
    '<img src="' + member.image + '" alt="' + member.name + '" class="member-image" onerror="this.style.display=\'none\'">' +
    '<h4 class="member-name">' + member.name + '</h4>' +
    '<div class="member-role">' + member.role + '</div>' +
    '<div class="member-info">' +
      '<div>📧 ' + member.contact + '</div>' +
      '<div>📞 ' + member.phone + '</div>' +
      '<div>📅 Joined: ' + formattedDate + '</div>' +
    '</div>' +
    '<div class="card-actions">' +
      '<button class="btn btn--sm btn--outline" onclick="editMember(\'' + member._id + '\')" data-member-id="' + member._id + '">Edit</button>' +
      '<button class="btn btn--sm btn--outline" onclick="deleteMember(\'' + member._id + '\')" style="color: var(--club-red); border-color: var(--club-red);" data-member-id="' + member._id + '">Delete</button>' +
    '</div>';

  return card;
}

function editMember(id) {
  const member = appData.members.find(function(m) { return m._id === id; });
  if (!member) return;

  currentEditingItem = id;
  currentEditingType = 'member';
  
  const elements = {
    modalTitle: document.getElementById('memberModalTitle'),
    name: document.getElementById('memberName'),
    contact: document.getElementById('memberContact'),
    phone: document.getElementById('memberPhone'),
    role: document.getElementById('memberRole'),
    joinDate: document.getElementById('memberJoinDate'),
    image: document.getElementById('memberImage'),
    modal: document.getElementById('memberModal')
  };

  if (elements.modalTitle) elements.modalTitle.textContent = 'Edit Member';
  if (elements.name) elements.name.value = member.name;
  if (elements.contact) elements.contact.value = member.contact;
  if (elements.phone) elements.phone.value = member.phone;
  if (elements.role) elements.role.value = member.role;
  if (elements.joinDate) elements.joinDate.value = new Date(member.joinDate).toISOString().split('T')[0];
  if (elements.image) elements.image.value = member.image;
  if (elements.modal) elements.modal.classList.remove('hidden');
}

async function addMember(memberData) {
  try {
    const newMember = await api.member.create(memberData);
    appData.members.push(newMember);
    renderMembers();
    showMessage('Member added successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error adding member:', error);
    showMessage('Failed to add member: ' + error.message, 'error');
    return false;
  }
}

async function updateMember(id, memberData) {
  try {
    const updatedMember = await api.member.update(id, memberData);
    const index = appData.members.findIndex(m => m._id === id);
    if (index !== -1) {
      appData.members[index] = updatedMember;
    }
    renderMembers();
    showMessage('Member updated successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error updating member:', error);
    showMessage('Failed to update member: ' + error.message, 'error');
    return false;
  }
}

async function deleteMember(id) {
  if (!confirm('Are you sure you want to delete this member?')) return;
  
  try {
    await api.member.delete(id);
    appData.members = appData.members.filter(m => m._id !== id);
    renderMembers();
    showMessage('Member deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting member:', error);
    showMessage('Failed to delete member: ' + error.message, 'error');
  }
}

// Donations Functions
async function addDonation(donationData) {
  try {
    const newDonation = await api.donation.create(donationData);
    appData.donations.push(newDonation);
    renderDonations();
    updateDashboardMetrics();
    showMessage('Donation added successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error adding donation:', error);
    showMessage('Failed to add donation: ' + error.message, 'error');
    return false;
  }
}

async function updateDonation(id, donationData) {
  try {
    const updatedDonation = await api.donation.update(id, donationData);
    const index = appData.donations.findIndex(d => d._id === id);
    if (index !== -1) {
      appData.donations[index] = updatedDonation;
    }
    renderDonations();
    updateDashboardMetrics();
    showMessage('Donation updated successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error updating donation:', error);
    showMessage('Failed to update donation: ' + error.message, 'error');
    return false;
  }
}

async function deleteDonation(id) {
  if (!confirm('Are you sure you want to delete this donation?')) return;
  
  try {
    await api.donation.delete(id);
    appData.donations = appData.donations.filter(d => d._id !== id);
    renderDonations();
    updateDashboardMetrics();
    showMessage('Donation deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting donation:', error);
    showMessage('Failed to delete donation: ' + error.message, 'error');
  }
}

// Expenses Functions
async function addExpense(expenseData) {
  try {
    const newExpense = await api.expense.create(expenseData);
    appData.expenses.push(newExpense);
    renderExpenses();
    updateDashboardMetrics();
    showMessage('Expense added successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error adding expense:', error);
    showMessage('Failed to add expense: ' + error.message, 'error');
    return false;
  }
}

async function updateExpense(id, expenseData) {
  try {
    const updatedExpense = await api.expense.update(id, expenseData);
    const index = appData.expenses.findIndex(e => e._id === id);
    if (index !== -1) {
      appData.expenses[index] = updatedExpense;
    }
    renderExpenses();
    updateDashboardMetrics();
    showMessage('Expense updated successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error updating expense:', error);
    showMessage('Failed to update expense: ' + error.message, 'error');
    return false;
  }
}

async function deleteExpense(id) {
  if (!confirm('Are you sure you want to delete this expense?')) return;
  
  try {
    await api.expense.delete(id);
    appData.expenses = appData.expenses.filter(e => e._id !== id);
    renderExpenses();
    updateDashboardMetrics();
    showMessage('Expense deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting expense:', error);
    showMessage('Failed to delete expense: ' + error.message, 'error');
  }
}

// Experiences Functions
async function addExperience(experienceData) {
  try {
    const newExperience = await api.experience.create(experienceData);
    appData.experiences.push(newExperience);
    renderExperiences();
    showMessage('Experience added successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error adding experience:', error);
    showMessage('Failed to add experience: ' + error.message, 'error');
    return false;
  }
}

async function updateExperience(id, experienceData) {
  try {
    const updatedExperience = await api.experience.update(id, experienceData);
    const index = appData.experiences.findIndex(e => e._id === id);
    if (index !== -1) {
      appData.experiences[index] = updatedExperience;
    }
    renderExperiences();
    showMessage('Experience updated successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error updating experience:', error);
    showMessage('Failed to update experience: ' + error.message, 'error');
    return false;
  }
}

async function deleteExperience(id) {
  if (!confirm('Are you sure you want to delete this experience?')) return;
  
  try {
    await api.experience.delete(id);
    appData.experiences = appData.experiences.filter(e => e._id !== id);
    renderExperiences();
    showMessage('Experience deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting experience:', error);
    showMessage('Failed to delete experience: ' + error.message, 'error');
  }
}

// Weekly Fees Functions
async function addWeeklyFee(feeData) {
  try {
    const newFee = await api.weeklyFee.create(feeData);
    appData.weeklyFees.push(newFee);
    renderWeeklyFees();
    showMessage('Weekly fee record added successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error adding weekly fee:', error);
    showMessage('Failed to add weekly fee: ' + error.message, 'error');
    return false;
  }
}

async function addPayment(feeId, paymentData) {
  try {
    const updatedFee = await api.weeklyFee.addPayment(feeId, paymentData);
    const index = appData.weeklyFees.findIndex(f => f._id === feeId);
    if (index !== -1) {
      appData.weeklyFees[index] = updatedFee;
    }
    renderWeeklyFees();
    showMessage('Payment added successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error adding payment:', error);
    showMessage('Failed to add payment: ' + error.message, 'error');
    return false;
  }
}

async function updatePaymentStatus(feeId, paymentId, status) {
  try {
    const updatedFee = await api.weeklyFee.updatePayment(feeId, paymentId, { status });
    const index = appData.weeklyFees.findIndex(f => f._id === feeId);
    if (index !== -1) {
      appData.weeklyFees[index] = updatedFee;
    }
    renderWeeklyFees();
    showMessage('Payment status updated to ' + status, 'success');
    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    showMessage('Failed to update payment status: ' + error.message, 'error');
    return false;
  }
}

async function deleteWeeklyFee(id) {
  if (!confirm('Are you sure you want to delete this weekly fee record?')) return;
  
  try {
    await api.weeklyFee.delete(id);
    appData.weeklyFees = appData.weeklyFees.filter(f => f._id !== id);
    renderWeeklyFees();
    showMessage('Weekly fee record deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting weekly fee:', error);
    showMessage('Failed to delete weekly fee: ' + error.message, 'error');
  }
}

// Gallery Functions
async function addGalleryItem(galleryData) {
  try {
    const newItem = await api.gallery.create(galleryData);
    appData.gallery.push(newItem);
    renderGallery();
    if (newItem.isTopFive) {
      renderTop5Gallery();
    }
    showMessage('Gallery item added successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error adding gallery item:', error);
    showMessage('Failed to add gallery item: ' + error.message, 'error');
    return false;
  }
}

async function updateGalleryItem(id, galleryData) {
  try {
    const updatedItem = await api.gallery.update(id, galleryData);
    const index = appData.gallery.findIndex(g => g._id === id);
    if (index !== -1) {
      const wasTopFive = appData.gallery[index].isTopFive;
      appData.gallery[index] = updatedItem;
      renderGallery();
      if (wasTopFive || updatedItem.isTopFive) {
        renderTop5Gallery();
      }
    }
    showMessage('Gallery item updated successfully!', 'success');
    return true;
  } catch (error) {
    console.error('Error updating gallery item:', error);
    showMessage('Failed to update gallery item: ' + error.message, 'error');
    return false;
  }
}

async function toggleTop5Status(id) {
  try {
    const item = appData.gallery.find(g => g._id === id);
    if (!item) return;
    
    const newStatus = !item.isTopFive;
    const updatedItem = await api.gallery.updateTop5(id, { 
      isTopFive: newStatus,
      order: newStatus ? getNextTop5Order() : 0
    });
    
    const index = appData.gallery.findIndex(g => g._id === id);
    if (index !== -1) {
      appData.gallery[index] = updatedItem;
    }
    
    renderGallery();
    renderTop5Gallery();
    showMessage('Gallery item ' + (newStatus ? 'added to' : 'removed from') + ' Top 5!', 'success');
  } catch (error) {
    console.error('Error toggling Top 5 status:', error);
    showMessage('Failed to update Top 5 status: ' + error.message, 'error');
  }
}

async function updateTop5Order() {
  try {
    const top5Items = document.querySelectorAll('#top5Gallery .gallery-item');
    const updates = [];
    
    top5Items.forEach(async (item, index) => {
      const id = item.getAttribute('data-id');
      const galleryItem = appData.gallery.find(g => g._id === id);
      
      if (galleryItem && galleryItem.order !== index + 1) {
        updates.push(api.gallery.updateTop5(id, { order: index + 1 }));
      }
    });
    
    if (updates.length > 0) {
      await Promise.all(updates);
      await loadAllData(); // Reload data to get updated orders
      renderGallery();
      renderTop5Gallery();
      showMessage('Top 5 order updated successfully!', 'success');
    }
  } catch (error) {
    console.error('Error updating Top 5 order:', error);
    showMessage('Failed to update Top 5 order: ' + error.message, 'error');
  }
}

async function deleteGalleryItem(id) {
  if (!confirm('Are you sure you want to delete this gallery item?')) return;
  
  try {
    const item = appData.gallery.find(g => g._id === id);
    const wasTopFive = item && item.isTopFive;
    
    await api.gallery.delete(id);
    appData.gallery = appData.gallery.filter(g => g._id !== id);
    
    renderGallery();
    if (wasTopFive) {
      renderTop5Gallery();
    }
    
    showMessage('Gallery item deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    showMessage('Failed to delete gallery item: ' + error.message, 'error');
  }
}

// Dashboard Functions
async function updateDashboardMetrics() {
  try {
    // Get donation total
    const donationTotal = await api.donation.getTotal();
    
    // Get expense total
    const expenseTotal = await api.expense.getTotal();
    
    // Get expense categories
    const expenseCategories = await api.expense.getByCategories();
    
    // Get weekly fee stats
    const feeStats = await api.weeklyFee.getStats();
    
    // Update dashboard UI with these values
    updateDashboardUI(donationTotal, expenseTotal, expenseCategories, feeStats);
  } catch (error) {
    console.error('Error updating dashboard metrics:', error);
    showMessage('Failed to update dashboard metrics', 'error');
  }
}

// Render charts for dashboard
function renderCharts() {
  console.log('Rendering charts...');
  renderDonationChart();
  renderExpenseChart();
  renderMemberRoleChart();
  renderWeeklyFeesChart();
}

// Render donation chart
function renderDonationChart() {
  const ctx = document.getElementById('donationChart');
  if (!ctx) return;
  
  // Group donations by month
  const donationsByMonth = {};
  appData.donations.forEach(donation => {
    const date = new Date(donation.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    if (!donationsByMonth[monthYear]) {
      donationsByMonth[monthYear] = 0;
    }
    donationsByMonth[monthYear] += donation.amount;
  });
  
  // Sort months chronologically
  const sortedMonths = Object.keys(donationsByMonth).sort((a, b) => {
    const [aMonth, aYear] = a.split('/').map(Number);
    const [bMonth, bYear] = b.split('/').map(Number);
    return aYear === bYear ? aMonth - bMonth : aYear - bYear;
  });
  
  // Create chart
  if (window.donationChart) window.donationChart.destroy();
  window.donationChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedMonths,
      datasets: [{
        label: 'Donations (₹)',
        data: sortedMonths.map(month => donationsByMonth[month]),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Render expense chart
function renderExpenseChart() {
  const ctx = document.getElementById('expenseChart');
  if (!ctx) return;
  
  // Group expenses by category
  const expensesByCategory = {};
  appData.expenses.forEach(expense => {
    if (!expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] = 0;
    }
    expensesByCategory[expense.category] += expense.amount;
  });
  
  // Create chart
  if (window.expenseChart) window.expenseChart.destroy();
  window.expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(expensesByCategory),
      datasets: [{
        label: 'Expenses by Category',
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  });
}

// Render member role chart
function renderMemberRoleChart() {
  const ctx = document.getElementById('memberRoleChart');
  if (!ctx) return;
  
  // Group members by role
  const membersByRole = {};
  appData.members.forEach(member => {
    if (!membersByRole[member.role]) {
      membersByRole[member.role] = 0;
    }
    membersByRole[member.role]++;
  });
  
  // Create chart
  if (window.memberRoleChart) window.memberRoleChart.destroy();
  window.memberRoleChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(membersByRole),
      datasets: [{
        label: 'Members by Role',
        data: Object.values(membersByRole),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    }
  });
}

// Render weekly fees chart
function renderWeeklyFeesChart() {
  const ctx = document.getElementById('weeklyFeesChart');
  if (!ctx) return;
  
  // Group weekly fees by month
  const feesByMonth = {};
  appData.weeklyFees.forEach(fee => {
    const date = new Date(fee.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    if (!feesByMonth[monthYear]) {
      feesByMonth[monthYear] = 0;
    }
    feesByMonth[monthYear] += fee.amount;
  });
  
  // Sort months chronologically
  const sortedMonths = Object.keys(feesByMonth).sort((a, b) => {
    const [aMonth, aYear] = a.split('/').map(Number);
    const [bMonth, bYear] = b.split('/').map(Number);
    return aYear === bYear ? aMonth - bMonth : aYear - bYear;
  });
  
  // Create chart
  if (window.weeklyFeesChart) window.weeklyFeesChart.destroy();
  window.weeklyFeesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sortedMonths,
      datasets: [{
        label: 'Weekly Fees (₹)',
        data: sortedMonths.map(month => feesByMonth[month]),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// PDF Export Functions
function exportToPDF(type) {
  if (!window.html2pdf) {
    showMessage('PDF export library not loaded. Please refresh the page.', 'error');
    return;
  }

  showMessage('Generating PDF report...', 'info');
  
  const opt = {
    margin: 1,
    filename: 'ledo-sports-academy-' + type + '-report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  let content = generateSimpleReport(type);

  const element = document.createElement('div');
  element.innerHTML = content;
  element.style.padding = '20px';
  element.style.fontFamily = 'Arial, sans-serif';

  html2pdf().set(opt).from(element).save().then(function() {
    showMessage('PDF report generated successfully!', 'success');
  }).catch(function(error) {
    console.error('Error generating PDF:', error);
    showMessage('Error generating PDF report', 'error');
  });
}

// Helper function to generate a simple report
function generateSimpleReport(type) {
  // Get totals from appData
  const totalDonations = appData.donations.reduce((sum, d) => sum + d.amount, 0);
  const totalExpenses = appData.expenses.reduce((sum, e) => sum + e.amount, 0);
  const netBalance = totalDonations - totalExpenses;

  return '<div style="text-align: center; margin-bottom: 30px;">' +
      '<h1 style="color: #1e3a8a; margin-bottom: 10px;">Ledo Sports Academy</h1>' +
      '<h2 style="color: #6b7280; margin-bottom: 5px;">' + type.charAt(0).toUpperCase() + type.slice(1) + ' Report</h2>' +
      '<p style="color: #6b7280;">Generated on ' + new Date().toLocaleDateString() + '</p>' +
    '</div>' +
    '<div style="margin-bottom: 30px;">' +
      '<h3 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">Academy Overview</h3>' +
      '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0;">' +
        '<div style="text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px;">' +
          '<h4>Total Members</h4>' +
          '<p style="font-size: 24px; font-weight: bold; color: #1e3a8a;">' + appData.members.length + '</p>' +
        '</div>' +
        '<div style="text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px;">' +
          '<h4>Total Activities</h4>' +
          '<p style="font-size: 24px; font-weight: bold; color: #1e3a8a;">' + appData.activities.length + '</p>' +
        '</div>' +
        '<div style="text-align: center; padding: 15px; background: #f3f4f6; border-radius: 8px;">' +
          '<h4>Net Balance</h4>' +
          '<p style="font-size: 24px; font-weight: bold; color: ' + (netBalance >= 0 ? '#10b981' : '#ef4444') + ';">₹' + netBalance.toLocaleString() + '</p>' +
        '</div>' +
      '</div>' +
    '</div>';
}