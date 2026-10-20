import { createClient } from '@supabase/supabase-js';

// Supabase Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize live Supabase client if keys exist
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Log initialization status
if (supabase) {
  console.log('Moments DB: Connected to Supabase backend.');
} else {
  console.log('Moments DB: Running in Local Storage Mock Mode.');
}

// Interfaces
export interface Order {
  id: string;
  customer_name: string;
  recipient_name: string;
  occasion: string;
  relationship: string;
  style: string;
  budget: string;
  message: string;
  whatsapp: string;
  email: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'PREVIEW_READY' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
}

export interface OrderFile {
  id: string;
  order_id: string;
  file_url: string;
  file_name: string;
  created_at: string;
}

export interface Project {
  id: string;
  order_id?: string;
  title: string;
  slug: string;
  template: string;
  preview_url?: string;
  published_url?: string;
  status: 'DRAFT' | 'PUBLISHED';
  data: any; // SurpriseData structure
  created_at: string;
}

// ----------------------------------------------------
// LOCAL STORAGE MOCK DB IMPLEMENTATION
// ----------------------------------------------------
const getLocalStorageData = <T>(key: string, defaultValue: T[]): T[] => {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return defaultValue;
  }
};

const setLocalStorageData = <T>(key: string, data: T[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

// Seed mock data if empty
const seedMockDB = () => {
  if (typeof window === 'undefined') return;

  const mockOrders: Order[] = [
    {
      id: 'ord-1',
      customer_name: 'Priya Sharma',
      recipient_name: 'Rahul Sharma',
      occasion: 'Anniversary',
      relationship: 'Husband',
      style: 'Cinematic',
      budget: '₹1,499 – ₹2,499',
      message: 'It is our 5th anniversary. We met in college and love traveling. Highlight our Rome and Florence memories.',
      whatsapp: '6001746854',
      email: 'priya@example.com',
      status: 'IN_PROGRESS',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'ord-2',
      customer_name: 'Anik Sen',
      recipient_name: 'The Gang',
      occasion: 'Friendship',
      relationship: 'Best Friends',
      style: 'Cute',
      budget: '₹499 – ₹999',
      message: 'Please put our college bunking tea memories. Make it colorful and full of fun jokes.',
      whatsapp: '6001746854',
      email: 'anik@example.com',
      status: 'NEW',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'ord-3',
      customer_name: 'Deepjyoti Saha',
      recipient_name: 'Aarav',
      occasion: 'Birthday',
      relationship: 'Friend',
      style: 'Elegant',
      budget: '₹1,499 – ₹2,499',
      message: 'Happy Birthday surprise website for Aarav. Wants a tech design.',
      whatsapp: '6001746854',
      email: 'deepjyoti@example.com',
      status: 'COMPLETED',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];

  const mockFiles: OrderFile[] = [
    {
      id: 'file-1',
      order_id: 'ord-1',
      file_name: 'wedding_photo.jpg',
      file_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];

  const mockProjects: Project[] = [
    {
      id: 'proj-1',
      order_id: 'ord-3',
      title: 'Aarav Birthday Surprise',
      slug: 'aarav-birthday',
      template: 'birthday',
      preview_url: '/s/aarav-birthday',
      published_url: '/s/aarav-birthday',
      status: 'PUBLISHED',
      data: {
        recipientName: 'Aarav',
        senderName: 'Deepjyoti',
        occasion: 'birthday',
        style: 'Elegant',
        message: 'Wishing you the happiest of birthdays, Aarav! You bring so much energy and joy to everyone around you. Here is a little walk down memory lane to celebrate your special day. Keep shining and coding! ✨',
        musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        themeColors: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          background: '#F8FAFC',
          text: '#1E293B',
          accent: '#F59E0B'
        },
        photos: [
          'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80',
          'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
          'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80'
        ],
        memories: [
          {
            date: 'June 2024',
            title: 'The Coding Marathon',
            description: 'That crazy 48-hour hackathon where we drank 12 cups of coffee and built a weird app.',
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80'
          }
        ]
      },
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'proj-anikesh',
      order_id: 'ord-anikesh',
      title: 'Happy Birthday, Aarushi — from Anikesh',
      slug: 'anikesh-aarushi',
      template: 'birthday',
      preview_url: 'https://anikesh.lovable.app',
      published_url: 'https://anikesh.lovable.app',
      status: 'PUBLISHED',
      data: {
        recipientName: 'Aarushi',
        senderName: 'Anikesh',
        occasion: 'birthday',
        style: 'Romantic & Long Distance',
        message: 'A handmade birthday letter from Gorakhpur to New Delhi (820 km) — written with nothing but love. Two cities, two states, one heart. Love doesn\'t count kilometers. It counts moments.',
        musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        themeColors: {
          primary: '#E11D48',
          secondary: '#BE185D',
          background: '#0F172A',
          text: '#F8FAFC',
          accent: '#FB7185'
        },
        photos: [
          '/anikesh-preview.png',
          '/anikesh-letter.png'
        ],
        memories: [
          {
            date: '820 km Apart',
            title: 'Gorakhpur to New Delhi',
            description: 'Two cities. Two states. One heart. Love doesn\'t count kilometers. It counts moments.',
            imageUrl: '/anikesh-preview.png'
          },
          {
            date: 'Daily Calls',
            title: 'My Peace in Every Storm',
            description: 'Every conversation with you makes even the longest days feel lighter. Thank you for making distance feel smaller.',
            imageUrl: '/anikesh-letter.png'
          }
        ]
      },
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];

  if (!localStorage.getItem('moments_orders')) {
    localStorage.setItem('moments_orders', JSON.stringify(mockOrders));
  }
  if (!localStorage.getItem('moments_files')) {
    localStorage.setItem('moments_files', JSON.stringify(mockFiles));
  }
  if (!localStorage.getItem('moments_projects')) {
    localStorage.setItem('moments_projects', JSON.stringify(mockProjects));
  } else {
    // Ensure newly added mock projects exist in existing stored array
    try {
      const stored = JSON.parse(localStorage.getItem('moments_projects') || '[]');
      let updated = false;
      for (const p of mockProjects) {
        if (!stored.some((item: any) => item.id === p.id || item.slug === p.slug)) {
          stored.unshift(p);
          updated = true;
        }
      }
      if (updated) {
        localStorage.setItem('moments_projects', JSON.stringify(stored));
      }
    } catch (e) {
      localStorage.setItem('moments_projects', JSON.stringify(mockProjects));
    }
  }
};

// Seed db if in browser
if (typeof window !== 'undefined') {
  seedMockDB();
}

// ----------------------------------------------------
// DATABASE ACCESS APIS
// ----------------------------------------------------

// ORDERS
export async function getOrders(): Promise<Order[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
  return getLocalStorageData<Order>('moments_orders', []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getOrderById(id: string): Promise<{ order: Order; files: OrderFile[] }> {
  if (supabase) {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    if (orderError) throw orderError;

    const { data: files, error: filesError } = await supabase
      .from('order_files')
      .select('*')
      .eq('order_id', id);
    if (filesError) throw filesError;

    return { order, files: files || [] };
  }

  const orders = getLocalStorageData<Order>('moments_orders', []);
  const order = orders.find(o => o.id === id);
  if (!order) throw new Error('Order not found');

  const files = getLocalStorageData<OrderFile>('moments_files', []);
  const orderFiles = files.filter(f => f.order_id === id);

  return { order, files: orderFiles };
}

export async function createOrder(
  orderInput: Omit<Order, 'id' | 'status' | 'created_at'>,
  uploadedFiles: { name: string; url: string }[]
): Promise<Order> {
  const newId = supabase ? '' : 'ord-' + Math.random().toString(36).substr(2, 9);
  const createdDate = new Date().toISOString();

  if (supabase) {
    const { data, error } = await supabase
      .from('orders')
      .insert([{ ...orderInput, status: 'NEW' }])
      .select()
      .single();
    if (error) throw error;

    if (uploadedFiles.length > 0) {
      const filesToInsert = uploadedFiles.map(file => ({
        order_id: data.id,
        file_name: file.name,
        file_url: file.url
      }));
      const { error: filesError } = await supabase
        .from('order_files')
        .insert(filesToInsert);
      if (filesError) throw filesError;
    }

    return data;
  }

  const orders = getLocalStorageData<Order>('moments_orders', []);
  const newOrder: Order = {
    ...orderInput,
    id: newId,
    status: 'NEW',
    created_at: createdDate
  };
  orders.push(newOrder);
  setLocalStorageData('moments_orders', orders);

  if (uploadedFiles.length > 0) {
    const files = getLocalStorageData<OrderFile>('moments_files', []);
    uploadedFiles.forEach(f => {
      files.push({
        id: 'file-' + Math.random().toString(36).substr(2, 9),
        order_id: newId,
        file_name: f.name,
        file_url: f.url,
        created_at: createdDate
      });
    });
    setLocalStorageData('moments_files', files);
  }

  return newOrder;
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    if (error) throw error;
    return;
  }

  const orders = getLocalStorageData<Order>('moments_orders', []);
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].status = status;
    setLocalStorageData('moments_orders', orders);
  } else {
    throw new Error('Order not found');
  }
}

// PROJECTS
export async function getProjects(): Promise<Project[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
  return getLocalStorageData<Project>('moments_projects', []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  const projects = getLocalStorageData<Project>('moments_projects', []);
  return projects.find(p => p.slug === slug) || null;
}

export async function createProject(projectInput: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
  const newId = supabase ? '' : 'proj-' + Math.random().toString(36).substr(2, 9);
  const createdDate = new Date().toISOString();

  if (supabase) {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectInput])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const projects = getLocalStorageData<Project>('moments_projects', []);
  const newProject: Project = {
    ...projectInput,
    id: newId,
    created_at: createdDate
  };
  projects.push(newProject);
  setLocalStorageData('moments_projects', projects);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  if (supabase) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const projects = getLocalStorageData<Project>('moments_projects', []);
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Project not found');

  const updatedProject = {
    ...projects[index],
    ...updates
  };
  projects[index] = updatedProject;
  setLocalStorageData('moments_projects', projects);
  return updatedProject;
}

export async function deleteProject(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return;
  }

  const projects = getLocalStorageData<Project>('moments_projects', []);
  const filtered = projects.filter(p => p.id !== id);
  setLocalStorageData('moments_projects', filtered);
}

// FILE UPLOADER (MOCK AND LIVE STORAGE)
export async function uploadFile(file: File): Promise<string> {
  if (supabase) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('moments-files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('moments-files')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  // Fallback to local Base64 string so files persist inside the local database
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

// AUTHENTICATION
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  if (supabase) {
    // If Supabase is active, check session storage or auth client state
    // Let's use session storage as a backup indicator
    return localStorage.getItem('moments_admin_logged') === 'true';
  }
  
  return localStorage.getItem('moments_admin_logged') === 'true';
}

export async function loginAdmin(emailOrUser: string, password: string): Promise<boolean> {
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrUser,
        password: password,
      });
      if (error) throw error;
      if (data.user) {
        localStorage.setItem('moments_admin_logged', 'true');
        return true;
      }
    } catch (e) {
      // In case Supabase Auth hasn't been set up yet, fallback to simple check
      if (emailOrUser === 'admin' && password === 'admin123') {
        localStorage.setItem('moments_admin_logged', 'true');
        return true;
      }
      return false;
    }
  }

  if (emailOrUser === 'admin' && password === 'admin123') {
    localStorage.setItem('moments_admin_logged', 'true');
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('moments_admin_logged');
    if (supabase) {
      supabase.auth.signOut();
    }
  }
}
