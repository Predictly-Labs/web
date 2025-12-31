import { useState, useCallback, useMemo } from 'react'
import { useGetPredictions } from './useGetPredictions'

interface FilterOptions {
  page?: number
  limit?: number
  groupId?: string
  status?: string
}

interface PredictionMarket {
  id: string
  groupId: string
  title: string
  description: string
  imageUrl: string
  marketType: string
  endDate: string
  minStake: number
  maxStake: number
  createdAt: string
  updatedAt: string
}

export const usePredictionsFilter = (initialFilters: FilterOptions = {}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    page: 1,
    limit: 10,
    ...initialFilters
  })

  const queryParams = useMemo(() => filters, [filters])
  
  const { 
    predictions, 
    isLoading, 
    error, 
    refetch 
  } = useGetPredictions(queryParams)

  const updateFilter = useCallback((key: keyof FilterOptions, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : prev.page
    }))
  }, [])

  const setPage = useCallback((page: number) => {
    updateFilter('page', page)
  }, [updateFilter])

  const setLimit = useCallback((limit: number) => {
    updateFilter('limit', limit)
  }, [updateFilter])

  const setGroupId = useCallback((groupId?: string) => {
    updateFilter('groupId', groupId)
  }, [updateFilter])

  const setStatus = useCallback((status?: string) => {
    updateFilter('status', status)
  }, [updateFilter])

  const resetFilters = useCallback(() => {
    setFilters({ page: 1, limit: 10 })
  }, [])

  const searchByGroup = useCallback((groupId: string) => {
    setFilters(prev => ({ ...prev, groupId, page: 1 }))
  }, [])

  const filterByStatus = useCallback((status: string) => {
    setFilters(prev => ({ ...prev, status, page: 1 }))
  }, [])

  return {
    predictions,
    filters,
    isLoading,
    error,
    setPage,
    setLimit,
    setGroupId,
    setStatus,
    resetFilters,
    searchByGroup,
    filterByStatus,
    refetch
  }
}