import axiosInstance from '@/lib/axiosClient'
import {
  allLeadsByPipelineSchema,
  allLeadShema,
  assingUserSchema,
  getOneLeadShema,
  historyLeadSchema,
  leadSchema,
  newLeadSchema,
  newLeadSchemaInput,
  noteSchema,
  ZAllLeads,
  ZAllLeadsByPipeline,
  ZAssingUser,
  ZHistoryLeads,
  ZLead,
  ZNote,
  ZOneLead,
} from '@/types/crm/leads'
import {
  getAllPipelineSchema,
  newPipelineSchema,
  ZGetPipelines,
} from '@/types/crm/pipeline'
import { isAxiosError } from 'axios'

export async function addLead(lead: newLeadSchemaInput) {
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
    const { data } = await axiosInstance.put<getOneLeadShema>(
      '/admin/lead/stage',
      {
        new_stage_id,
        lead_id,
      }
    )
    const validData = ZOneLead.parse(data)
    return validData
  } catch (error) {
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
      `/admin/leads/pipeline/${pipelineId}?page=${page}&limit=${limit}${status ? '&status=' + status : ''}${userId ? '&userId=' + status : ''}${orderBy ? '&orderBy=' + orderBy : ''}`
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
export async function getOneLead(id: string) {
  try {
    const { data } = await axiosInstance.get<getOneLeadShema>(
      `/admin/lead/${id}`
    )
    const validData = ZOneLead.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al obtener este cliente potencial.')
    }
  }
}
export async function updateLeadField({
  lead,
  id,
}: {
  id: string
  lead: {
    [key: string]: string | number | undefined | null
  }
}) {
  try {
    const { data } = await axiosInstance.put<getOneLeadShema>(
      `/admin/lead/fields/${id}`,
      lead
    )
    const validData = ZOneLead.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error(
        'Error al actualizar los datos de este cliente potencial.'
      )
    }
  }
}
export async function deleteOneLead(id: string) {
  try {
    const { data } = await axiosInstance.delete(`/admin/lead/${id}`)

    return data
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Error al eliminar este cliente potencial.')
    }
  }
}
type TLeadAddNote = {
  leadId: string
  note: string
}
export async function leadAddNote({ leadId, note }: TLeadAddNote) {
  try {
    const { data } = await axiosInstance.post<noteSchema>(
      `/admin/lead/${leadId}/note`,
      { note }
    )
    const validData = ZNote.parse(data)
    return validData
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrio un error al agregar la nota')
    }
  }
}
type THistoryLead = {
  leadId: string
  changeLogs?: boolean
  file?: boolean
  notes?: boolean
}
export async function getLeadHistory({
  leadId,
  changeLogs,
  file,
  notes,
}: THistoryLead) {
  try {
    const params = new URLSearchParams()

    if (changeLogs) params.append('changeLogs', 'true')
    if (file) params.append('file', 'true')
    if (notes) params.append('notes', 'true')

    const query = params.toString()
    const url = `/admin/lead/fill/${leadId}${query ? '?' + query : ''}`

    const { data } = await axiosInstance.get<historyLeadSchema>(url)
    return ZHistoryLeads.parse(data)
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      const status = error.response.status
      const msg =
        error.response.data?.response?.msg || 'Error desconocido del servidor'

      throw new Error(msg, { cause: status })
    }

    throw new Error('Ocurrió un error al obtener el historial del lead')
  }
}
type TAssinedTo = {
  leadId: string
  userId: string | null
}
export async function assignedToNewUser({ leadId, userId }: TAssinedTo) {
  try {
    const { data } = await axiosInstance.put<assingUserSchema>(
      `/admin/lead/${leadId}/assing`,
      { userId }
    )
    const validData = ZAssingUser.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrió un error al asignar el usuario')
    }
  }
}

type TChangeStatus = {
  leadId: string
  status: getOneLeadShema['status']
  lostComment?: string
}
export async function changeLeadStatus({
  leadId,
  status,
  lostComment,
}: TChangeStatus) {
  try {
    const { data } = await axiosInstance.put<getOneLeadShema>(
      `/admin/lead/${leadId}/end`,
      { status, lostComment }
    )
    const validData = ZOneLead.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrió un error al cambiar el estado.')
    }
  }
}
type TSwichContactLead = {
  leadId: string
  isNewContact: boolean
  contactName?: string
  contactId?: string
}
export async function switchContactLead({
  leadId,
  contactId,
  isNewContact,
  contactName,
}: TSwichContactLead) {
  try {
    const { data } = await axiosInstance.put<getOneLeadShema>(
      `/admin/lead/${leadId}/swich-contact`,
      { isNewContact, contactName, contactId }
    )
    const validData = ZOneLead.parse(data)
    return validData
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.response.msg, {
        cause: error.response.status,
      })
    } else {
      throw new Error('Ocurrió un error al cambiar de contacto.')
    }
  }
}
