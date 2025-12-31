import { useState, useCallback, useMemo } from 'react'
import { usePredictions } from './usePredictions'

interface PredictionsQueryParams {
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

interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

export const useGetPredictionsWithPagination = () => {
  const [predictions, setPredictions] = useState<PredictionMarket[]>([])
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [filters, setFilters] = useState<Pick<PredictionsQueryParams, 'groupId' | 'status'>>({})
  
  const { getPredictions, isLoading, error } = usePredictions()

  const queryParams = useMemo(() => ({
    page: pagination.page,
    limit: pagination.limit,
    ...filters
  }), [pagination.page, pagination.limit, filters])

  const fetchPredictions = useCallback(async (params?: PredictionsQueryParams) => {
    try {
      const finalParams = { ...queryParams, ...params }
      const data = await getPredictions(finalParams)
      setPredictions(data)
    } catch (err) {
      console.error('Failed to fetch predictions:', err)
    }
  }, [getPredictions, queryParams])

  const setPage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }))
  }, [])

  const setLimit = useCallback((limit: number) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }))
  }, [])

  const setGroupFilter = useCallback((groupId?: string) => {
    setFilters(prev => ({ ...prev, groupId }))
    setPagination(prev => ({ ...prev, page: 1 }))
  }, [])

  const setStatusFilter = useCallback((status?: string) => {
    setFilters(prev => ({ ...prev, status }))
    setPagination(prev => ({ ...prev, page: 1 }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({})
    setPagination(prev => ({ ...prev, page: 1 }))
  }, [])

  const refetch = useCallback(() => {
    fetchPredictions()
  }, [fetchPredictions])

  const nextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      setPage(pagination.page + 1)
    }
  }, [pagination.page, pagination.totalPages, setPage])

  const previousPage = useCallback(() => {
    if (pagination.page > 1) {
      setPage(pagination.page - 1)
    }
  }, [pagination.page, setPage])

  return {
    predictions,
    pagination,
    filters,
    isLoading,
    error,
    fetchPredictions,
    setPage,
    setLimit,
    setGroupFilter,
    setStatusFilter,
    clearFilters,
    refetch,
    nextPage,
    previousPage,
    canGoNext: pagination.page < pagination.totalPages,
    canGoPrevious: pagination.page > 1
  }
}