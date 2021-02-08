import { Form, Input, Button } from "./SearchBar.elements"


export default function SearchBar (props) {

  return (
    <Form onSubmit={props.fetchAPI}>
      <Input type="text" name="inputWord"
 value={props.inputWord} onChange={props.handleChange} />
      <Button type="submit">GO</Button>
    </Form>
  )
}

