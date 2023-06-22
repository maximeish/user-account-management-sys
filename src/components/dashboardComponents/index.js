import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledAlert,
  StyledLabel,
  StyledTitle,
  Div,
  FormWrapper,
  FormTextWrapper,
} from "../formComponents";
import UserContext from "../../context/UserContext";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 2em;
`;

const Text = styled.div`
  margin-bottom: 1em;
`;

const Header = styled.header`
  font-weight: bold;
  font-size: large;
  opacity: 0.7;
  letter-spacing: 0.5px;
  margin-bottom: 1em;
`;

const List = styled.ul``;

const Li = styled.li`
  margin: 0.5em 0;
  cursor: pointer;
  font-size: large;
  letter-spacing: 0.5px;
  font-weight: 500;
  color: darkblue;
  opacity: 0.8;
`;

export default function Profile() {
  const { userData } = useContext(UserContext);

  const [fn, setFn] = React.useState("");
  const [ln, setLn] = React.useState("");
  const [p, setP] = React.useState("");
  const [s, setS] = React.useState("");
  const [b, setB] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [studyField, setStudyField] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [user, setUser] = React.useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/v1/users/${userData.user.id}`, {
        headers: {
          Authorization: `Basic ${userData.token}`,
        },
      })
      .then((r) => {
        setUser(r.data);
        setFn(r.data.fn);
        setLn(r.data.ln);
        setGender(r.data.gender);
        setStudyField(r.data.study_field);
        setLocation(r.data.location);
        setP(r.data.p);
        setS(r.data.s);
        setB(r.data.b);

        console.log("receiv", r.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const updatedFields = {};
    const names = ["fn", "ln", "p", "s", "b", "location", "gender"];
    [fn, ln, p, s, b, location, gender].forEach((f, i) => {
      if (f !== "") {
        updatedFields[names[i]] = f;
      }
    });

    await axios
      .patch(
        `http://localhost:3000/v1/users/${userData.user.id}`,
        updatedFields,
        {
          headers: {
            Authorization: `Basic ${userData.token}`,
          },
        }
      )
      .then(r => {
        toast.success("Update successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      })
      .catch();

    console.log({ ...updatedFields, id: userData.user.id });
    setLoading(false);
  };

  return (
    <Wrapper>
      <Header>Account Management</Header>
      <MDBContainer className="w-80 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center p-4"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBTypography tag="h5">
                    {fn} {ln}
                  </MDBTypography>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Bio</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">First Name</MDBTypography>
                        <StyledInput
                          type="text"
                          onChange={(e) => setFn(e.target.value)}
                          value={fn}
                          required
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Last Name:</MDBTypography>
                        <MDBCardText className="text-muted">
                          <StyledInput
                            type="text"
                            onChange={(e) => setLn(e.target.value)}
                            value={ln}
                            required
                          />
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <StyledInput
                          type="text"
                          onChange={(e) => setGender(e.target.value)}
                          value={gender}
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Location</MDBTypography>
                        <MDBCardText className="text-muted">
                          <StyledInput
                            type="text"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            required
                          />
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Education</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6">Primary</MDBTypography>
                        <StyledInput
                          type="text"
                          onChange={(e) => setP(e.target.value)}
                          value={p}
                          required
                        />
                        <MDBTypography tag="h6">Secondary</MDBTypography>
                        <MDBCardText className="text-muted">
                          <StyledInput
                            type="text"
                            onChange={(e) => setS(e.target.value)}
                            value={s}
                            required
                          />
                        </MDBCardText>
                        <MDBTypography tag="h6">Bachelor</MDBTypography>
                        <MDBCardText className="text-muted">
                          <StyledInput
                            type="text"
                            onChange={(e) => setB(e.target.value)}
                            value={b}
                            required
                          />
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Field of Study</MDBTypography>
                        <select
                          type="text"
                          onChange={(e) => setStudyField(e.target.value)}
                          required
                        >
                          <option value="IT">IT</option>
                          <option value="Construction">Construction</option>
                          <option value="Math">Math</option>
                          <option value="Law">Law</option>
                        </select>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <Div></Div>
                      <MDBCol size="6" className="mb-3">
                        <PuffLoader color="#36d7b7" loading={loading} />
                      </MDBCol>
                      <MDBCol size="6" className="justify-content-right mb-3">
                        <StyledButton onClick={handleSubmit}>
                          Update
                        </StyledButton>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Wrapper>
  );
}
