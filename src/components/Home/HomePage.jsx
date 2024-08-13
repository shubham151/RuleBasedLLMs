import React, {useState} from "react";
import { useFormik } from "formik";
import styles from "../../css/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import HandleRules from "../HandleRules/HandleRules";
import Groq from "groq-sdk";

function Homepage() {
  const navigate = useNavigate();
  const [groqOutput, setGroqOutput] = useState("");
  const groq = new Groq({
    apiKey: `${import.meta.env.VITE_GROG_API_KEY}`,
    dangerouslyAllowBrowser: true,
  });
  
  const formik = useFormik({
    initialValues: {
      topic: "",
      rules: [""],
    },
    onSubmit: async (values) => {
      try {
        console.log("values", `Rephrase content: ${
                values.topic
              } and also make sure the conditions are getting followed ${values.rules.join(
                " and "
              )}`);
        const response = await groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Rephrase content with conditions ${values.rules.join(
                " and "
              )} just give me rephrased paragraph for  ${
                values.topic
              }`,
            },
          ],
          model: "llama3-8b-8192",
        });
        const output = response.choices[0].message.content.split(":")[1].trim();
        setGroqOutput(output);
        console.log(output);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div className={styles.Homepage + "text-center my-1"}>
      <header>
        <h1 className={styles["Homepage-header"]}>Custom Scripts</h1>

        <form onSubmit={formik.handleSubmit} className="text-center">
            <div className="form-group mt-1 row">
                <div className="d-flex justify-content-center  mb-5 col-md-6">
                    <textarea
                        type="text"
                        name="topic"
                        onChange={formik.handleChange}
                        value={formik.values.topic}
                        placeholder="Write your content here and be creative and make your ad to reach out everyone"
                        className="form-control bg-dark text-white me-2"
                        style={{
                        // flex: "0 0 140%",
                        minHeight: "10rem", 
                        overflowWrap: "break-word",
                        whiteSpace: "pre-wrap"
                        }} 
                    />
                </div>

                <div className="d-flex  align-items-center mb-5 col-md-6">
                    <textarea
                        type="text"
                        name="result"
                        value={groqOutput}
                        onChange={formik.handleChange}
                        readOnly
                        placeholder="Results will appear here"
                        className="form-control bg-dark text-white me-2"
                        style={{
                        // flex: "0 0 140%",
                        minHeight: "10rem", 
                        overflowWrap: "break-word", 
                        whiteSpace: "pre-wrap",
                        }} // 70% width
                    />
                </div>
            <div>
            <HandleRules formik={formik} />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary bg-dark text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Homepage;
