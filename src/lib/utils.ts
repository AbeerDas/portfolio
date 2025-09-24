import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// scroll to element
export function scrollTo(element: Element | null) {
  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

// Configuration object - can be updated dynamically
const CONFIG = {
  resume: {
    url: "https://drive.google.com/file/d/1SP53o3U36OjXKGx61wFCCyKECMdm6Kvc/view?usp=sharing",
  },
};

// Function to update the resume URL globally
export async function updateResumeUrl(newUrl: string, password: string) {
  try {
    const response = await fetch('/api/update-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        newUrl: newUrl,
      }),
    });

    if (response.ok) {
      // Update local config immediately
      CONFIG.resume.url = newUrl;
      return { success: true };
    } else {
      const error = await response.json() as { message: string };
      return { success: false, error: error.message };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

// Function to load resume URL from server
export async function loadResumeUrl() {
  try {
    const response = await fetch('/api/get-config');
    if (response.ok) {
      const config = await response.json() as { resumeUrl: string };
      CONFIG.resume.url = config.resumeUrl;
    }
  } catch (error) {
    console.error('Failed to load config from server:', error);
  }
}

// Export the config object
export { CONFIG };
