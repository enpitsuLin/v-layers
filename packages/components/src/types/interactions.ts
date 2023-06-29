import type * as interaction from 'ol/interaction'
import type { DragAndDropEvent } from 'ol/interaction/DragAndDrop'
import type { DragBoxEvent } from 'ol/interaction/DragBox'
import type { SelectEvent } from 'ol/interaction/Select'
import type { TranslateEvent } from 'ol/interaction/Translate'
import type { DefineComponent } from '@vue/runtime-core'
import type { BaseObservableEvents, EventProps } from './events'

export type Interactions = Omit<typeof interaction, 'defaults'>

export type InteractionsName = keyof Interactions

export type InteractionsEventMapping = {
  [Name in Exclude<InteractionsName, 'DragAndDrop' | 'DragBox' | 'DragZoom' | 'Select' | 'Translate'>]: BaseObservableEvents
} & {
  DragAndDrop: BaseObservableEvents & {
    'addfeatures': DragAndDropEvent
  }
  DragBox: BaseObservableEvents & {
    [Name in 'boxcancel' | 'boxdrag' | 'boxend' | 'boxstart']: DragBoxEvent
  }
  DragZoom: BaseObservableEvents & {
    [Name in 'boxcancel' | 'boxdrag' | 'boxend' | 'boxstart']: DragBoxEvent
  }
  Select: BaseObservableEvents & {
    select: SelectEvent
  }
  Translate: BaseObservableEvents & {
    [Name in 'translateend' | 'translatestart' | 'translating']: TranslateEvent
  }
}

export type InteractionProps<Name extends InteractionsName> = EventProps<NonNullable<ConstructorParameters<Interactions[Name]>[0]>, InteractionsEventMapping[Name]>

export type AllInteractionComponents = { [Name in InteractionsName]: DefineComponent<InteractionProps<Name>> }
