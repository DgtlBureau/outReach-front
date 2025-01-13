import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import instance from './api'
import { useQuery } from '@tanstack/react-query'

interface IUseFetch {
  data: any
  isLoading: boolean
  refetch: () => void
}

export const useFetch = (url: string, errorMessage: string): IUseFetch => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      const { data } = await instance.get(url)
      setData(data)
    } catch (error) {
      enqueueSnackbar(errorMessage, { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = () => {
    loadProducts()
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return { data, isLoading, refetch }
}

export const useQueryFetch = (
  url: string,
  queryKey: [string, string?]
): IUseFetch => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const { data } = await instance.get(url)
      return data
    },
    queryKey: queryKey,
  })

  return { data, isLoading, refetch }
}
