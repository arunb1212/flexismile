import React, { useState,useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import { useNavigate,useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getTreatmentPlans,createTreatmentPlan,updateTreatmentPlan, deleteTreatmentPlan } from "../Services/treatmentPlanService";

const createPhotoPreviews = (files) =>
  Array.from(files).map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));
  
  

const newPlanTemplate = () => ({
  id: null,
  extraoral_photos: [],
  intraoral_photos: [],
  radiographs: [],
  videos: [],
  ipr:[],
  status: "pending",
  createdAt: new Date().toISOString(),
});

function AddTreatmentPlan() {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState(newPlanTemplate());
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { PatientId } = useParams();
  console.log("patientId",PatientId);

  useEffect(() => {
  const fetchPlans = async () => {
    try {
      const data = await getTreatmentPlans(PatientId);
      console.log("data",data);
      // ===== IMPORTANT FIX =====
      if (Array.isArray(data)) {
        setTreatmentPlans(data);
      } else {
        console.warn("Invalid data format, resetting");
        setTreatmentPlans([]);
      }
    } catch (err) {
      console.error(err);
      setTreatmentPlans([]);
    }
  };

  fetchPlans();
}, [PatientId]);
useEffect(() => {
  return () => {
    currentPlan.extraoral_photos.forEach(p => URL.revokeObjectURL(p.preview));
  };
}, []);

  // ===== PHOTO HANDLERS =====
  const handlePhotoChange = (type, e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos = createPhotoPreviews(files);

    setCurrentPlan((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newPhotos],
    }));

    e.target.value = null;
  };

  const removePhoto = (type, index) => {
    setCurrentPlan((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  // ===== VIDEO =====
  const handleVideoChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newVideos = createPhotoPreviews(files);

    setCurrentPlan((prev) => ({
      ...prev,
      videos: [...prev.videos, ...newVideos],
    }));

    e.target.value = null;
  };

  const removeVideo = (index) => {
    setCurrentPlan((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  // ==== IPR ==== //
const handleIprChange = (e) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const newFiles = createPhotoPreviews(files);

  setCurrentPlan((prev) => ({
    ...prev,
    ipr: [...prev.ipr, ...newFiles],
  }));

  e.target.value = null;
};

const removeIpr = (index) => {
  setCurrentPlan((prev) => ({
    ...prev,
    ipr: prev.ipr.filter((_, i) => i !== index),
  }));
};

  // ===== RESET =====
  const resetCurrentPlan = () => {
    setCurrentPlan(newPlanTemplate());
    setEditingId(null);
  };

  // ===== SAVE (UPDATED ONLY THIS PART) =====
  const savePlan = async () => {
  if (isAnyPlanAccepted) {
  alert("A plan is already approved. No further changes allowed.");
  return;
}
  if (
    currentPlan.extraoral_photos.length === 0 &&
    currentPlan.intraoral_photos.length === 0 &&
    currentPlan.radiographs.length === 0
  ) {
    alert("Please add at least one photo.");
    return;
  }

  try {
    setLoading(true);

    // 🚫 BLOCK UPDATE IF ACCEPTED
    if (editingId !== null) {
      const existing = treatmentPlans.find((p) => p.id === editingId);

      if (existing?.status === "accepted") {
        alert("Approved plans cannot be modified. Use RePlan.");
        return;
      }

      const updatedPlan = {
        ...currentPlan,
        id: editingId,
      };

      const res = await updateTreatmentPlan(updatedPlan,PatientId);

      setTreatmentPlans((prev) =>
        prev.map((p) => (p.id === editingId ? res : p))
      );

      setEditingId(null);
    }

    // CREATE (unchanged)
    else {
      const savedPlan = await createTreatmentPlan(currentPlan,PatientId);
      setTreatmentPlans((prev) => [...prev, savedPlan]);
      Swal.fire({
        title: "Plan Added Successfully!",
        text: "Treatment plan has been created.",
        icon: "success",
        confirmButtonColor: "#C49358",
      });
    }

    setCurrentPlan(newPlanTemplate());
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error saving treatment plan",
      text: err.message,
      icon: "error",
      confirmButtonColor: "#C49358",
    });
  } finally {
    setLoading(false);
  }
};

  // ===== EDIT =====
  const editPlan = (plan) => {
  if (isAnyPlanAccepted) {
    alert("A plan is already approved. Editing is locked.");
    return;
  }

  setCurrentPlan({
    ...plan,
    extraoral_photos: plan.extraoral_photos.map((p) =>
      typeof p === "string" ? { preview: p } : p
    ),
    intraoral_photos: plan.intraoral_photos.map((p) =>
      typeof p === "string" ? { preview: p } : p
    ),
    radiographs: plan.radiographs.map((p) =>
      typeof p === "string" ? { preview: p } : p
    ),
    status: plan.status,
    videos: plan.videos.map((v) =>
      typeof v === "string" ? { preview: v } : v
    ),
    ipr: plan.ipr?.map((f) =>
      typeof f === "string" ? { preview: f } : f
    ) || [],
  });

  setEditingId(plan.id);
};

 const deletePlan = async(planId) => {
  try{
    const res = await deleteTreatmentPlan(planId,PatientId);
    setTreatmentPlans((prev) => prev.filter((p) => p.id !== planId));
  }catch (err) {
    console.error(err);
    alert("Error saving treatment plan");
  } finally {
    setLoading(false);
  }
 }

  // ===== STATUS =====
  const setPlanStatus = async (planId, status) => {
  try {
    // 🚫 block if already accepted anywhere
    if (treatmentPlans.some(p => p.status === "accepted")) return;

    // find the selected plan
    const selectedPlan = treatmentPlans.find(p => p.id === planId);

    if (!selectedPlan) return;

    // ===== CASE: ACCEPT =====
    if (status === "accepted") {
      // update all plans: one accepted, rest rejected
      const updatedPlans = await Promise.all(
        treatmentPlans.map(async (plan) => {
          const newStatus = plan.id === planId ? "accepted" : "rejected";

          const updated = await updateTreatmentPlan({
            ...plan,
            status: newStatus,
            
          },PatientId);

          return updated;
        })
      );

      setTreatmentPlans(updatedPlans);
    }

    // ===== CASE: REJECT ONLY ONE =====
    else {
      const updated = await updateTreatmentPlan({
        ...selectedPlan,
        status,
      });

      setTreatmentPlans(prev =>
        prev.map(p => (p.id === planId ? updated : p))
      );
    }

  } catch (err) {
    console.error(err);
    alert("Error updating status");
  }
};

  const renderStatusBadge = (status) => {
    if (status === "accepted") return <Badge bg="success">Accepted</Badge>;
    if (status === "rejected") return <Badge bg="danger">Rejected</Badge>;
    return <Badge bg="secondary">Pending</Badge>;
  };

  // ===== PHOTO SECTION (UNCHANGED STYLING) =====
  const PhotoSection = ({ title, type, photos }) => (
    <Card className="p-3 h-100">
      <h5>{title}</h5>

      <input
        type="file"
        accept="image/*"
        multiple
        id={type}
        style={{ display: "none" }}
        onChange={(e) => handlePhotoChange(type, e)}
      />

      <div className="d-flex flex-wrap gap-2">
        {photos.map((photo, index) => (
          <div
            key={index}
            style={{
              width: 200,
              height: 200,
              borderRadius: 8,
              overflow: "hidden",
              position: "relative",
              border: "1px solid #ddd",
            }}
          >
            <img
              src={photo.preview || photo}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            <button
              onClick={() => removePhoto(type, index)}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                border: "none",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                borderRadius: "50%",
                width: 22,
                height: 22,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}

        <label
          htmlFor={type}
          style={{
            width: 200,
            height: 200,
            borderRadius: 8,
            border: "2px dashed #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 28,
            color: "#999",
          }}
        >
          +
        </label>
      </div>
    </Card>
  );
  const isAnyPlanAccepted = treatmentPlans.some(p => p.status === "accepted");
  let index = 0;

  return (
    <Container className="py-4">
      {!isAnyPlanAccepted && (
        <Card className="p-4 shadow-sm">
        <h3>Add Treatment Plan</h3>

        <div className="p-2"/>
        <PhotoSection title="Extraoral Photos" type="extraoral_photos" photos={currentPlan.extraoral_photos} />

        <div className="p-2"/>
        <PhotoSection title="Intraoral Photos" type="intraoral_photos" photos={currentPlan.intraoral_photos} />

        <div className="p-2"/>
        <PhotoSection title="Radiographs" type="radiographs" photos={currentPlan.radiographs} />

        {/* VIDEOS */}
        <Row className="mt-3">
          <Col>
            <Card className="p-3">
              <h5>Videos</h5>
              <Form.Control type="file" accept="video/*" multiple onChange={handleVideoChange} />

              <div className="d-flex flex-wrap gap-2 mt-2">
                {currentPlan.videos.map((video, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <video width="160" height="90" controls src={video.preview || video} />
                    <Button
                      size="sm"
                      variant="danger"
                      className="position-absolute top-0 end-0"
                      onClick={() => removeVideo(index)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
        {/* IPR PDFs */}
<Row className="mt-3">
  <Col>
    <Card className="p-3">
      <h5>IPR (PDF)</h5>

      <Form.Control
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleIprChange}
      />

      <div className="d-flex flex-wrap gap-2 mt-2">
        {currentPlan.ipr.map((file, index) => (
          <div key={index} style={{ position: "relative" }}>
            <a
              href={file.preview || file}
              target="_blank"
              rel="noreferrer"
            >
              📄 PDF {index + 1}
            </a>

            <Button
              size="sm"
              variant="danger"
              className="position-absolute top-0 end-0"
              onClick={() => removeIpr(index)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={() => navigate("/ipr")}> Generate IPR </Button>
    </Card>
  </Col>
</Row>

        <div className="mt-3">
          <Button onClick={savePlan} disabled={loading}>
            {loading ? "Saving..." : "Save Plan"}
          </Button>
          <Button variant="secondary" className="ms-2" onClick={resetCurrentPlan}>
            Reset
          </Button>
        </div>
      </Card>
      )}
      {isAnyPlanAccepted && (
        <Button
          size="lg"
          className="ms-2"
          variant="warning"
          onClick={() => navigate(`/replan/${PatientId}`)}
        >
          RePlan
        </Button>
      )}

      {/* SAVED PLANS */}
      <Row className="mt-4">
        {treatmentPlans.map((plan) => (
            <Card className="p-3" key={plan.id}>
              <h5>Treatment Plan {index= index + 1}</h5>
              <div className="p-2"/>    
              {renderStatusBadge(plan.status)}
              <div className="p-2"/>
              <p><strong><h5>Extraoral Photos</h5></strong></p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {plan.extraoral_photos.map((p, i) => (
                <img key={i} src={p.preview || p} width={200} height={200}
                style={{ objectFit: "cover", borderRadius: "6px" }} />
              ))}
              </div>
              
            <div className="p-2"/>
            <p><strong><h5>Intraoral Photos</h5></strong></p>

            {plan.intraoral_photos.length == 0 ? <img 
              width={200} height={200}
              src="http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"></img> :
              <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {plan.intraoral_photos.map((p, i) => (
                <img key={i} src={p.preview || p} width={200} height={200}
                style={{ objectFit: "cover", borderRadius: "6px"}}/>
              ))}
              </div>}
            <div className="p-2"/>

              <p><strong><h5>Radiographs</h5></strong></p>
              {plan.radiographs.length == 0 ? <img 
              width={200} height={200}
              src="http://swargworld.com/wp-content/uploads/2017/01/No_image_available.jpg"></img> :
              <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {plan.radiographs.map((p, i) => (
                <img key={i} src={p.preview || p} width={200} height={200}
                style={{ objectFit: "cover", borderRadius: "6px"}}/>
              ))}
              </div>}
              <div className="p-2"/>

              <p><strong><h5>Videos</h5></strong></p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {plan.videos.map((v, i) => (
                    <video
                    key={i}
                    src={v.preview || v}
                    width={300}
                    height={200}
                    controls
                    style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        background: "#000"
                    }}
                    />
                ))}
                </div>
                <div className="p-2"/>
                
                <div className="p-2"/>
                <p><strong><h5>IPR Files</h5></strong></p>

                {plan.ipr?.length === 0 ? (
                  <p>No IPR files</p>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {plan.ipr.map((file, i) => (
                      <a
                        key={i}
                        href={file.preview || file}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          textDecoration: "none",
                          background: "#f8f9fa",
                        }}
                      >
                        📄 View PDF {i + 1}
                      </a>
                    ))}
                  </div>
                )}

              <div className="mt-2">
                <Button
                  size="lg"
                  onClick={() => editPlan(plan)}
                  disabled={isAnyPlanAccepted}
                >
                  Edit
                </Button>
                <Button
                  size="lg"
                  className="ms-2"
                  onClick={() => deletePlan(plan.id)}
                  disabled={isAnyPlanAccepted && plan.status == "accepted"}
                >
                  Delete
                </Button>

                <Button
                  size="lg"
                  className="ms-2"
                  onClick={() => setPlanStatus(plan.id, "accepted")}
                  disabled={isAnyPlanAccepted}
                >
                  Accept
                </Button>

                <Button
                  size="lg"
                  className="ms-2"
                  onClick={() => setPlanStatus(plan.id, "rejected")}
                  disabled={isAnyPlanAccepted}
                >
                  Reject
                </Button> 
              </div>
            </Card>
        ))}
      </Row>

      <Button className="mt-3" onClick={() => navigate(-1)}>
        Back
      </Button>
    </Container>
  );
}

export default AddTreatmentPlan;