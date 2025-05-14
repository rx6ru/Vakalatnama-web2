import { Router, Request, Response, NextFunction } from 'express';
import authCheck from '../middleware/petAuth';
import { z } from 'zod'; // Using Zod for validation

const router = Router();

// Public routes (no auth required)

/**
 * Handle sign-in form submission
 * Returns JWT token that Next.js frontend can store in cookies/localStorage
 */
router.post('/signin', (req: Request, res: Response, next: NextFunction) => {
  // Define Zod schema for validation
  const SignInSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
  });
  
  // Validate request body
  const result = SignInSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ 
      success: false,
      errors: result.error.format() 
    });
  }

  try {
    // Your authentication logic here
    // Generate JWT token if credentials are valid
    
    // Instead of redirecting (which doesn't work well with API routes),
    // return success status and token that Next.js can use
    res.status(200).json({
      success: true,
      token: "your-jwt-token", // Replace with actual token
      message: "Authentication successful"
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
});

/**
 * Sign-in page route
 * If user is already authenticated, returns redirect info
 * If not authenticated, returns appropriate status
 */
router.get('/signin', (req: Request, res: Response) => {
  // Check if Authorization header exists and is valid
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(200).json({
      authenticated: false,
      message: "User not authenticated"
    });
  }
  
  try {
    // Verify token (similar to what authCheck does)
    // If valid, indicate redirection is needed
    res.status(200).json({
      authenticated: true,
      message: "User is already authenticated",
      redirect: "/petitioner/dashboard"
    });
  } catch (error) {
    res.status(200).json({
      authenticated: false,
      message: "Invalid authentication"
    });
  }
});

// Apply authentication middleware to all routes below this point
router.use(authCheck);

// Protected routes (auth required)

/**
 * Get dashboard data for authenticated user
 */
router.get('/dashboard', (req: Request, res: Response) => {
  try {
    const username = req.headers.username as string;
    
    // Query database for user data using username
    // const userData = await db.getUserData(username);
    
    res.status(200).json({
      success: true,
      data: {
        username,
        // Include other user details from database
      }
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard data"
    });
  }
});

/**
 * Get user profile data for editing
 */
router.get('/dashboard/edit', (req: Request, res: Response) => {
  try {
    const username = req.headers.username as string;
    
    // Query database for user data
    // const userData = await db.getUserData(username);
    
    res.status(200).json({
      success: true,
      data: {
        username,
        // Include other editable user fields
      }
    });
  } catch (error) {
    console.error("Profile data fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve profile data"
    });
  }
});

/**
 * Update user profile data
 */
router.post('/dashboard/edit', (req: Request, res: Response) => {
  // Define Zod schema for profile update
  const ProfileUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    // Add other fields as needed
  });
  
  // Validate request body
  const result = ProfileUpdateSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ 
      success: false,
      errors: result.error.format() 
    });
  }

  try {
    const username = req.headers.username as string;
    
    // Update user data in database
    // await db.updateUserData(username, result.data);
    
    // Return success response instead of redirect
    res.status(200).json({
      success: true,
      message: "Profile updated successfully"
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
});

export default router;