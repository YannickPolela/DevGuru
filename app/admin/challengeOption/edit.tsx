import { SimpleForm, Edit, TextInput, ReferenceInput, required, BooleanInput } from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput 
          source="text" 
          validate={[required()]} 
          label="Text"
        />
        <BooleanInput
          source="correct"
          label="Correct option"
        />
        <ReferenceInput
          source="challengeId"
          reference="challenges"
        />
      </SimpleForm>
    </Edit>
  );
};
