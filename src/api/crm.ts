import axiosInstance from '@/lib/axiosClient'
import {
  allLeadsByPipelineSchema,
  allLeadShema,
  leadSchema,
  newLeadSchema,
  ZAllLeads,
  ZAllLeadsByPipeline,
  ZLead,
} from '@/types/crm/leads'
import {
  getAllPipelineSchema,
  newPipelineSchema,
  ZGetPipelines,
} from '@/types/crm/pipeline'
import { isAxiosError } from 'axios'

export async function addLead(lead: newLeadSchema) {
  try {
    const { data } = await axiosInstance.post<leadSchema>(
      '/admin/leads/add',
      lead
    )
    const validData = ZLead.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('An unexpected error occurred while add new lead.')
    }
  }
}

type TFilterLeads = {
  query?: string
  limit: string
  page: string
  orderBy?: 'value' | 'title'
  userId?: string
  pipelineId?: string
  pipelineUrl?: string
  status?: 'ACTIVE' | 'DELETED' | 'ARCHIVE' | 'LOST' | 'WON'
}
export async function getAllsLeads({
  page,
  limit,
  query,
  status,
  orderBy,
  userId,
  pipelineId,
  pipelineUrl,
}: TFilterLeads) {
  try {
    const { data } = await axiosInstance.get<allLeadShema>(
      `/admin/leads?page=${page}&limit=${limit}${query ? '&q=' + query : ''}${status ? '&status=' + status : ''}${userId ? '&userId=' + status : ''}${pipelineId ? '&pipelineId=' + pipelineId : ''}${pipelineUrl ? '&pipelineUrl=' + pipelineUrl : ''}${orderBy ? '&orderBy=' + orderBy : ''}`
    )
    const validData = ZAllLeads.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg)
    } else {
      throw new Error('Ocurrió un error al obtener los Clientes.')
    }
  }
}

export async function addPipeline(lead: newPipelineSchema) {
  try {
    const { data } = await axiosInstance.post('/admin/pipeline/add', lead)
    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('An unexpected error occurred while add new pipeline.')
    }
  }
}
export async function getPipelines() {
  try {
    const { data } =
      await axiosInstance.get<getAllPipelineSchema>('/admin/pipeline/')
    const validData = ZGetPipelines.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('An unexpected error occurred while get pipelines.')
    }
  }
}
type TChangeStage = {
  new_stage_id: string
  lead_id: string
}
export async function changeStage({ new_stage_id, lead_id }: TChangeStage) {
  try {
    const { data } = await axiosInstance.put<leadSchema>('/admin/lead/stage', {
      new_stage_id,
      lead_id,
    })
    const validData = ZLead.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al sincronizar con el servidor.')
    }
  }
}
type TFilterLeadsByPipeline = {
  pipelineId: string
  limit: string
  page: string
  orderBy?: 'value' | 'title'
  userId?: string
  status?: 'ACTIVE' | 'DELETED' | 'ARCHIVE' | 'LOST' | 'WON'
}
export async function getAllsLeadsByPipeline({
  page,
  limit,
  status,
  orderBy,
  userId,
  pipelineId,
}: TFilterLeadsByPipeline) {
  try {
    const { data } = await axiosInstance.get<allLeadsByPipelineSchema>(
      `/admin/leads/${pipelineId}?page=${page}&limit=${limit}${status ? '&status=' + status : ''}${userId ? '&userId=' + status : ''}${orderBy ? '&orderBy=' + orderBy : ''}`
    )
    const validData = ZAllLeadsByPipeline.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrió un error al obtener los Clientes.')
    }
  }
}
