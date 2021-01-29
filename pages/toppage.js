import react, {useState} from "react";
import Link from "next/link";

export default function InputForm() {
  const [searchWord, setSearchWord] = useState("");

  const handleChange = (event) => {
        setSearchWord(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchWord);
    let a = "a"
  };

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name="searchWord" placeholder="happiness, in order to, put aside...'" value={searchWord} onChange={handleChange} />

     <Link passHref
       href="pages/posts/[Param]"
       as={"/videoSelect/" + searchWord}  
      >
      <input type="submit" value="Submit" />
      </Link>
    </form>
  );
}





// <form onSubmit = {this.fetchAPI}> {/* //refer your function using `this`. Need page transtion here as well */}
// <input type = 'text' placeholder = 'happiness, in order to, put aside...' name="inputWord" value={this.state.inputWord} onChange={this.handleChange} ></input>
// <input type='submit' placeholder='GO' value = 'GO'></input>
// </form>