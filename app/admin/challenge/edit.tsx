import { SimpleForm, Edit, TextInput, ReferenceInput, NumberInput, required, SelectInput } from "react-admin";

export const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput 
          source="question" 
          validate={[required()]} 
          label="Question"
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
             {
              id: "INFO",
              name: "INFO",
            }
          ]}
          validate={[required()]} 
        />
        <ReferenceInput
          source="lessonId"
          reference="lessons"
        />
        <NumberInput
          source="order"
          validate={[required()]}
          label="Order"
        />
        <TextInput 
          source="imageSrc" 
          validate={[required()]} 
          label="Image"
        />
        <TextInput 
          source="videoSrc" 
          validate={[required()]} 
          label="Video"
        />
      </SimpleForm>
    </Edit>
  );
};
