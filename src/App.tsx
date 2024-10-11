import { useEffect } from "react";
import "./App.css";
import { Vendor, vendors } from "./venders.ts";

function App() {
  useEffect(() => {
    // todo-Yoki
    console.info(">>> hello");

    const controller = new AbortController();
    const signal = controller.signal;

    Promise.all(
      vendors.map(
        (vendor: Vendor) =>
          new Promise((resolve, reject) => {
            fetch(vendor.Api, { signal })
              .then((res) => res.json())
              .then((data) => {
                resolve(data);
              })
              .catch((e) => {
                if (e.name === "AbortError") {
                  return;
                }

                reject(e);
              });
          }),
      ),
    )
      .then((data) => {
        // todo-Yoki
        console.info(">>> data", data);
      })
      .catch((e) => {
        // todo-Yoki
        console.info(">>> error", e);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return <div className="container">hello</div>;
}

export default App;
