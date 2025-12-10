const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(
      response.status,
      `HTTP error! status: ${response.status}`
    );
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return response.text() as T;
}

export const api = {
  // Get all products
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    return handleResponse<Product[]>(response);
  },

  // Get product by ID
  async getProductById(id: number) {
    const response = await fetch(`${API_BASE_URL}/api/product/${id}`);
    return handleResponse<Product>(response);
  },

  // Add new product with image
  async addProduct(
    product: Omit<Product, "id" | "imageData">,
    imageFile?: File
  ) {
    const formData = new FormData();

    // Add product data as JSON
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], {
        type: "application/json",
      })
    );

    // Add image file if provided
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/api/product`, {
      method: "POST",
      body: formData,
    });

    return handleResponse<Product>(response);
  },

  // Get hello world message
  async getHello() {
    const response = await fetch(`${API_BASE_URL}/`);
    return handleResponse<string>(response);
  },
};

// Product interface matching the Java entity
export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  releaseDate: string; // ISO date string
  productAvailable: boolean;
  stockQuantity: number;
  imageName?: string;
  imageType?: string;
  imageData?: string; // Base64 encoded image data
}
