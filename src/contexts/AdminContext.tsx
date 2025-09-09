// src/contexts/AdminContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Car, Property, Hotel, Transfer, Tour } from "../types";

// User Type
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "manager";
  avatar?: string;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLogin?: string;
}

// Booking Type
export interface Booking {
  id: string;
  userId: string;
  serviceType: "car" | "property" | "hotel" | "transfer" | "tour";
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalAmount: number;
  bookingDate: string;
  serviceDate: string;
  paymentStatus: "pending" | "paid" | "refunded";
}

// Admin Stats
export interface AdminStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  activeServices: number;
  pendingBookings: number;
  monthlyGrowth: number;
}

// Context Type
interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  contextLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Data
  cars: Car[];
  properties: Property[];
  hotels: Hotel[];
  transfers: Transfer[];
  tours: Tour[];
  users: User[];
  bookings: Booking[];
  stats: AdminStats;

  // CRUD Operations
  addCar: (car: Omit<Car, "id">) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;

  addProperty: (property: Omit<Property, "id">) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;

  addHotel: (hotel: Omit<Hotel, "id">) => void;
  updateHotel: (id: string, hotel: Partial<Hotel>) => void;
  deleteHotel: (id: string) => void;

  addTransfer: (transfer: Omit<Transfer, "id">) => void;
  updateTransfer: (id: string, transfer: Partial<Transfer>) => void;
  deleteTransfer: (id: string) => void;

  addTour: (tour: Omit<Tour, "id">) => void;
  updateTour: (id: string, tour: Partial<Tour>) => void;
  deleteTour: (id: string) => void;

  // User Management
  addUser: (user: Omit<User, "id" | "createdAt">) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Booking Management
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  deleteBooking: (id: string) => void;

  // UI State
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Create Context
const AdminContext = createContext<AdminContextType | undefined>(undefined);
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};

// Generic CRUD Helpers
const addItem = <T extends { id: string }>(
  setList: React.Dispatch<React.SetStateAction<T[]>>,
  item: Omit<T, "id">
) => {
  const newItem = { ...item, id: Date.now().toString() } as T;
  setList(prev => [...prev, newItem]);
};

const updateItem = <T extends { id: string }>(
  setList: React.Dispatch<React.SetStateAction<T[]>>,
  id: string,
  update: Partial<T>
) => {
  setList(prev => prev.map(item => (item.id === id ? { ...item, ...update } : item)));
};

const deleteItem = <T extends { id: string }>(
  setList: React.Dispatch<React.SetStateAction<T[]>>,
  id: string
) => {
  setList(prev => prev.filter(item => item.id !== id));
};

// Admin Provider
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contextLoading, setContextLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Data State
  const [cars, setCars] = useState<Car[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [stats] = useState<AdminStats>({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeServices: 0,
    pendingBookings: 0,
    monthlyGrowth: 0,
  });

  // Load auth from localStorage
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const userData = localStorage.getItem("admin_user");
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setContextLoading(false);
  }, []);

  // Login
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Replace with real API call
      if ((email === "mhthodol@gmail.com" || email === "admin") && password === "admin123") {
        const adminUser: User = {
          id: "admin1",
          name: "Admin User",
          email: email.includes("@") ? email : "mhthodol@gmail.com",
          role: "admin",
          status: "active",
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("admin_token", "FAKE_TOKEN");
        localStorage.setItem("admin_user", JSON.stringify(adminUser));
        setIsAuthenticated(true);
        setUser(adminUser);
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setIsAuthenticated(false);
    setUser(null);
  };

  // CRUD Operations using generic helpers
  const addCarFn = (car: Omit<Car, "id">) => addItem(setCars, car);
  const updateCarFn = (id: string, car: Partial<Car>) => updateItem(setCars, id, car);
  const deleteCarFn = (id: string) => deleteItem(setCars, id);

  const addPropertyFn = (property: Omit<Property, "id">) => addItem(setProperties, property);
  const updatePropertyFn = (id: string, property: Partial<Property>) => updateItem(setProperties, id, property);
  const deletePropertyFn = (id: string) => deleteItem(setProperties, id);

  const addHotelFn = (hotel: Omit<Hotel, "id">) => addItem(setHotels, hotel);
  const updateHotelFn = (id: string, hotel: Partial<Hotel>) => updateItem(setHotels, id, hotel);
  const deleteHotelFn = (id: string) => deleteItem(setHotels, id);

  const addTransferFn = (transfer: Omit<Transfer, "id">) => addItem(setTransfers, transfer);
  const updateTransferFn = (id: string, transfer: Partial<Transfer>) => updateItem(setTransfers, id, transfer);
  const deleteTransferFn = (id: string) => deleteItem(setTransfers, id);

  const addTourFn = (tour: Omit<Tour, "id">) => addItem(setTours, tour);
  const updateTourFn = (id: string, tour: Partial<Tour>) => updateItem(setTours, id, tour);
  const deleteTourFn = (id: string) => deleteItem(setTours, id);

  const addUserFn = (u: Omit<User, "id" | "createdAt">) =>
    addItem(setUsers, { ...u, createdAt: new Date().toISOString() });
  const updateUserFn = (id: string, u: Partial<User>) => updateItem(setUsers, id, u);
  const deleteUserFn = (id: string) => deleteItem(setUsers, id);

  const updateBookingStatusFn = (id: string, status: Booking["status"]) =>
    updateItem(setBookings, id, { status });
  const deleteBookingFn = (id: string) => deleteItem(setBookings, id);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        contextLoading,
        user,
        login,
        logout,
        cars,
        properties,
        hotels,
        transfers,
        tours,
        users,
        bookings,
        stats,
        addCar: addCarFn,
        updateCar: updateCarFn,
        deleteCar: deleteCarFn,
        addProperty: addPropertyFn,
        updateProperty: updatePropertyFn,
        deleteProperty: deletePropertyFn,
        addHotel: addHotelFn,
        updateHotel: updateHotelFn,
        deleteHotel: deleteHotelFn,
        addTransfer: addTransferFn,
        updateTransfer: updateTransferFn,
        deleteTransfer: deleteTransferFn,
        addTour: addTourFn,
        updateTour: updateTourFn,
        deleteTour: deleteTourFn,
        addUser: addUserFn,
        updateUser: updateUserFn,
        deleteUser: deleteUserFn,
        updateBookingStatus: updateBookingStatusFn,
        deleteBooking: deleteBookingFn,
        loading,
        setLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
