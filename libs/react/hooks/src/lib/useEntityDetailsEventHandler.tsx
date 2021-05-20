export interface AttributeInputEvents {
  id?: string;
  onSave: () => any;
  onCancel: () => void;
}

let configInputEventList: AttributeInputEvents[] = [];

export const useEntityDetailsEventHandler = (): [
  AttributeInputEvents[],
  {
    addEvent: (event: AttributeInputEvents) => void;
    clearEventList: () => void;
  },
] => {
  return [
    configInputEventList,
    {
      addEvent: (event: AttributeInputEvents) => {
        configInputEventList.push(event);
      },
      clearEventList: () => {
        configInputEventList = [];
      },
    },
  ];
};
