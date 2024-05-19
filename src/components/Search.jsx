import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography, Grid } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "95%",
    padding: "0 1px",
    backgroundColor: "#30889f",
  },
  gradientBackground: {
    background: "linear-gradient(to right, #f0f0f0, #add8e6)",
    padding: theme.spacing(2),
    //maxWidth: "100%",
    // minWidth: "100%",
    alignItems: "center",
    margin: "0 5px",
    borderRadius: "10px", // Add rounded corners to the Paper component
  },
  searchInput: {
    flexGrow: 1,
    border: "none",
    outline: "none",
    borderRadius: "20px",
    height: "40px",
    width: "400px",
    marginLeft: theme.spacing(1),
  },
  searchButton: {
    background: "#add8e6", // Change button color to light blue
    borderRadius: "24px", // Add rounded corners to the button
    marginLeft: theme.spacing(1), // Add margin between input field and button
  },
}));

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultFetched, setResultFetched] = useState(false);
  const classes = useStyles();
  const [expandedForms, setExpandedForms] = useState(false);
  const [expandedStrengths, setExpandedStrengths] = useState(false);
  const [expandedPackings, setExpandedPackings] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedStrength, setSelectedStrength] = useState("");
  const [selectedPacking, setSelectedPacking] = useState("");
  const [showHideFormButton, setShowHideFormButton] = useState(false);
  const [showHideStrengthButton, setShowHideStrengthButton] = useState(false);
  const [showHidePackingButton, setShowHidePackingButton] = useState(false);
  const [minimumPrice, setMinimumPrice] = useState(false);

  const getMinimumPrice = () => {
    // results[selectedForm].salt_forms_json[
    //   results[0].available_forms[0]
    // ];
  };

  const toggleExpandedForms = () => {
    setShowHideFormButton((prev) => !prev);
    setExpandedForms((prev) => !prev);
  };

  const toggleExpandedPackings = () => {
    setShowHidePackingButton((prev) => !prev);
    setExpandedPackings((prev) => !prev);
  };
  const toggleExpandedStrengths = () => {
    setShowHideStrengthButton((prev) => !prev);
    setExpandedStrengths((prev) => !prev);
  };

  const handleFormSelection = (form) => {
    setSelectedForm(form);
  };

  const handleStrengthSelection = (strength) => {
    setSelectedStrength(strength);
  };

  const handlePackingSelection = (packing) => {
    setSelectedPacking(packing);
  };

  const handleSearch = async () => {
    setLoading(true);
    setResultFetched(true);
    try {
      const response = await fetch(
        `https://backend.cappsule.co.in/api/v1/new_search?q=${searchTerm}&pharmacyIds=1,2,3`
      );
      const data = await response.json();
      setResults(data.data.saltSuggestions);
      console.log("Result Data==============>>>>>>", data.data.saltSuggestions);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (results && results.length > 0) {
      setSelectedForm(results[0].available_forms[0]);
      console.log(
        "Selected Strength===>>",
        Object.keys(
          results[0].salt_forms_json[results[0].available_forms[0]]
        )[0]
      );
      console.log(
        "Selected Packing===>>",
        Object.keys(
          results[0].salt_forms_json[results[0].available_forms[0]][
            Object.keys(
              results[0].salt_forms_json[results[0].available_forms[0]]
            )[0]
          ]
        )[0]
      );
      setSelectedStrength(
        Object.keys(
          results[0].salt_forms_json[results[0].available_forms[0]]
        )[0]
      );
      setSelectedPacking(
        Object.keys(
          results[0].salt_forms_json[results[0].available_forms[0]][
            Object.keys(
              results[0].salt_forms_json[results[0].available_forms[0]]
            )[0]
          ]
        )[0]
      );
    }
  }, [results, selectedStrength]);

  return (
    <div className={classes.container}>
      {!resultFetched && (
        <Typography
          style={{ marginBottom: "60px", color: "white" }}
          variant="body1"
        >
          Cappsule web development test.
        </Typography>
      )}
      <Paper elevation={1} square={false} style={{ marginTop: "20px" }}>
        <TextField
          className={classes.searchInput}
          placeholder="Type your medicine name here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ disableUnderline: true }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button
          className={classes.searchButton}
          onClick={handleSearch}
          disabled={!searchTerm || loading}
          variant="contained"
          color="#add8e6"
        >
          <SearchIcon />
        </Button>
      </Paper>
      {loading && (
        <Typography variant="body1" style={{ color: "white" }}>
          Loading...
        </Typography>
      )}
      {!resultFetched && (
        <Typography
          style={{ marginTop: "60px", color: "white" }}
          variant="body1"
        >
          "Find medicines with amazing discount"
        </Typography>
      )}

      {results && (
        <div>
          <Typography
            style={{ color: "white", marginTop: "10px" }}
            variant="h5"
          >
            Search Results:
          </Typography>

          <ul style={{ listStyleType: "none", padding: 0 }}>
            {results.map((result) => (
              <li
                key={result.id}
                style={{ marginBottom: "10px", width: "1000px" }}
              >
                <Paper
                  elevation={1}
                  square={false}
                  className={classes.gradientBackground}
                >
                  <Grid
                    container
                    display="flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Grid item md={3} xs={3} style={{ alignContent: "center" }}>
                      <Grid container display="flex">
                        <Typography> Form: </Typography>
                        {expandedForms ? (
                          <>
                            {result.available_forms.map((form) => (
                              <Button
                                key={form.id}
                                variant={
                                  form === selectedForm
                                    ? "contained"
                                    : "outlined"
                                }
                                onClick={() => handleFormSelection(form)}
                                size="small"
                                style={{
                                  marginLeft: "10px",
                                  marginBottom: "10px",
                                  paddingTop: "0px",
                                  paddingBottom: "0px",
                                }}
                              >
                                {form}
                              </Button>
                            ))}
                            {showHideFormButton &&
                              result.available_forms.length > 2 && (
                                <Button
                                  variant="text"
                                  color="primary"
                                  onClick={toggleExpandedForms}
                                  style={{
                                    textTransform: "none",
                                  }}
                                >
                                  hide..
                                </Button>
                              )}
                          </>
                        ) : (
                          <>
                            {result.available_forms.slice(0, 2).map((form) => (
                              <Button
                                key={form.id}
                                variant={
                                  form === selectedForm
                                    ? "contained"
                                    : "outlined"
                                }
                                onClick={() => handleFormSelection(form)}
                                size="small"
                                style={{
                                  marginLeft: "10px",
                                  marginBottom: "10px",
                                  paddingTop: "0px",
                                  paddingBottom: "0px",
                                }}
                              >
                                {form}
                              </Button>
                            ))}
                            {result.available_forms.length > 2 && (
                              <Button
                                variant="text"
                                color="primary"
                                onClick={toggleExpandedForms}
                                style={{ textTransform: "none" }}
                              >
                                more..
                              </Button>
                            )}
                          </>
                        )}
                      </Grid>

                      {selectedStrength && (
                        <Grid container display="flex">
                          <Typography> Strength: </Typography>
                          {expandedStrengths ? (
                            <Grid>
                              {result.salt_forms_json[selectedForm] &&
                                Object.keys(
                                  result.salt_forms_json[selectedForm]
                                ).map((strength) => (
                                  <Button
                                    key={strength}
                                    variant={
                                      strength === selectedStrength
                                        ? "contained"
                                        : "outlined"
                                    }
                                    onClick={() =>
                                      handleStrengthSelection(strength)
                                    }
                                    style={{
                                      marginLeft: "10px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {strength}
                                  </Button>
                                ))}
                              {showHideStrengthButton &&
                                Object.keys(
                                  result.salt_forms_json[selectedForm]
                                ).length > 2 && (
                                  <Button
                                    variant="text"
                                    color="primary"
                                    onClick={toggleExpandedStrengths}
                                    style={{ textTransform: "none" }}
                                  >
                                    hide..
                                  </Button>
                                )}
                            </Grid>
                          ) : (
                            <Grid>
                              {Object.keys(result.salt_forms_json[selectedForm])
                                .slice(0, 2)
                                .map((strength) => (
                                  <Button
                                    key={strength}
                                    variant={
                                      strength === selectedStrength
                                        ? "contained"
                                        : "outlined"
                                    }
                                    onClick={() =>
                                      handleStrengthSelection(strength)
                                    }
                                    size="small"
                                    style={{
                                      marginLeft: "10px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {strength}
                                  </Button>
                                ))}

                              {Object.keys(result.salt_forms_json[selectedForm])
                                .length > 2 && (
                                <Button
                                  variant="text"
                                  color="primary"
                                  onClick={toggleExpandedStrengths}
                                  style={{ textTransform: "none" }}
                                >
                                  more..
                                </Button>
                              )}
                            </Grid>
                          )}
                        </Grid>
                      )}

                      {selectedPacking && (
                        <Grid container display="flex">
                          <Typography> Packaging: </Typography>
                          {expandedPackings ? (
                            <Grid>
                              {result.salt_forms_json[selectedForm] &&
                                result.salt_forms_json[selectedForm][
                                  selectedStrength
                                ] &&
                                Object.keys(
                                  result.salt_forms_json[selectedForm][
                                    selectedStrength
                                  ]
                                ).map((packaging) => (
                                  <Button
                                    key={packaging}
                                    variant={
                                      packaging === selectedPacking
                                        ? "contained"
                                        : "outlined"
                                    }
                                    onClick={() =>
                                      handlePackingSelection(packaging)
                                    }
                                    style={{
                                      marginLeft: "10px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {packaging}
                                  </Button>
                                ))}
                              {showHidePackingButton &&
                                Object.keys(
                                  result.salt_forms_json[selectedForm][
                                    selectedStrength
                                  ]
                                ).length > 2 && (
                                  <Button
                                    variant="text"
                                    color="primary"
                                    onClick={toggleExpandedPackings}
                                    style={{ textTransform: "none" }}
                                  >
                                    hide..
                                  </Button>
                                )}
                            </Grid>
                          ) : (
                            <Grid>
                              {result.salt_forms_json[selectedForm] &&
                                result.salt_forms_json[selectedForm][
                                  selectedStrength
                                ] &&
                                Object.keys(
                                  result.salt_forms_json[selectedForm][
                                    selectedStrength
                                  ]
                                )
                                  .slice(0, 2)
                                  .map((packing) => (
                                    <Button
                                      key={packing}
                                      variant={
                                        packing === selectedPacking
                                          ? "contained"
                                          : "outlined"
                                      }
                                      onClick={() =>
                                        handlePackingSelection(packing)
                                      }
                                      size="small"
                                      style={{
                                        marginLeft: "10px",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      {packing}
                                    </Button>
                                  ))}

                              {result.salt_forms_json[selectedForm] &&
                                result.salt_forms_json[selectedForm][
                                  selectedStrength
                                ] &&
                                Object.keys(
                                  result.salt_forms_json[selectedForm][
                                    selectedStrength
                                  ]
                                ).length > 2 && (
                                  <Button
                                    variant="text"
                                    color="primary"
                                    onClick={toggleExpandedPackings}
                                    style={{ textTransform: "none" }}
                                  >
                                    more..
                                  </Button>
                                )}
                            </Grid>
                          )}
                        </Grid>
                      )}
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={4}
                      style={{ alignContent: "center", justifyItems: "left" }}
                    >
                      <Grid>{result.salt}</Grid>
                      <Grid>
                        {" "}
                        {`${selectedForm}|${selectedStrength}|${selectedPacking}`}
                      </Grid>
                    </Grid>
                    <Grid item md={3} xs={3} style={{ alignContent: "center" }}>
                      {" "}
                      {selectedPacking && (
                        <div>{/* Display price information here */}</div>
                      )}
                      {!selectedPacking && (
                        <Typography
                          variant="body1"
                          style={{
                            backgroundColor: "white",
                            padding: "5px ",
                          }}
                        >
                          No stores selling this product near you.
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
