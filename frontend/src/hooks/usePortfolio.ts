import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export interface SavedPortfolio {
  id: string;
  investmentAmount: number;
  riskLevel: string;
  allocations: Array<{
    ticker: string;
    percentage: number;
    dollarAmount: number;
  }>;
  expectedReturns: {
    1: number;
    2: number;
    5: number;
    10: number;
  };
  monthlyContribution?: {
    finalValue: number;
    totalContributions: number;
    totalGrowth: number;
    yearlyProjections: Array<{
      year: number;
      value: number;
      contributions: number;
      growth: number;
    }>;
  };
  timestamp: Date;
}

export function usePortfolio() {
  const { currentUser } = useAuth();
  const [portfolios, setPortfolios] = useState<SavedPortfolio[]>([]);
  const [loading, setLoading] = useState(false);

  const savePortfolio = async (portfolioData: {
    investmentAmount: number;
    riskLevel: string;
    allocations: Array<{
      ticker: string;
      percentage: number;
      dollarAmount: number;
    }>;
    expectedReturns: {
      1: number;
      2: number;
      5: number;
      10: number;
    };
    monthlyContribution?: {
      finalValue: number;
      totalContributions: number;
      totalGrowth: number;
      yearlyProjections: Array<{
        year: number;
        value: number;
        contributions: number;
        growth: number;
      }>;
    };
  }) => {
    if (!currentUser) {
      throw new Error('User must be logged in to save portfolios');
    }

    if (!db) {
      throw new Error('Firestore is not initialized. Please check your environment variables.');
    }

    try {
      const portfolioRef = collection(db, 'users', currentUser.uid, 'portfolios');
      await addDoc(portfolioRef, {
        ...portfolioData,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error saving portfolio:', error);
      throw error;
    }
  };

  const fetchPortfolios = async () => {
    if (!currentUser) {
      setPortfolios([]);
      return;
    }

    if (!db) {
      console.error('Firestore is not initialized');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const portfolioRef = collection(db, 'users', currentUser.uid, 'portfolios');
      const q = query(portfolioRef);
      const querySnapshot = await getDocs(q);
      
      const portfoliosData: SavedPortfolio[] = [];
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        portfoliosData.push({
          id: docSnapshot.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
        } as SavedPortfolio);
      });

      // Sort by timestamp, newest first
      portfoliosData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setPortfolios(portfoliosData);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePortfolio = async (portfolioId: string) => {
    if (!currentUser) {
      throw new Error('User must be logged in to delete portfolios');
    }

    if (!db) {
      throw new Error('Firestore is not initialized. Please check your environment variables.');
    }

    try {
      const portfolioDoc = doc(db, 'users', currentUser.uid, 'portfolios', portfolioId);
      await deleteDoc(portfolioDoc);
      await fetchPortfolios(); // Refresh the list
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchPortfolios();
    } else {
      setPortfolios([]);
    }
  }, [currentUser]);

  return {
    portfolios,
    loading,
    savePortfolio,
    fetchPortfolios,
    deletePortfolio,
  };
}

