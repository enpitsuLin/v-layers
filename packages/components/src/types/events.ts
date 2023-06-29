import type OlEvent from 'ol/events/Event'
import type { ObjectEvent } from 'ol/Object'
import type { Types as ObjectEventType } from 'ol/ObjectEventType'
import type { EventTypes } from 'ol/Observable'

export type BaseObservableEvents = { [Name in EventTypes]: OlEvent } & { [Name in 'change:active' | ObjectEventType]: ObjectEvent }

export type EventProps<Props, Events> = Partial<Props> & {
  [Name in keyof Events as Name extends string ? `on${Capitalize<Name>}` : never]?: (event: Events[Name]) => void;
}
