import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
function Attendance() {
  const imgRef = useRef(null);
  const [videoLoad, setVideoLoad] = useState(false);
  const [detected, setDetected] = useState([]);
  useEffect(() => {
    if (videoLoad) {
      setInterval(async () => {
        const response = await axios.get("/api/v1/detected_faces");
        setDetected(response.data.faces);
      }, 3000);
    }
  }, [videoLoad]);

  return (
    <div>
      {!videoLoad ? <h1>Loading...</h1> : ""}
      <img
        className=""
        ref={imgRef}
        src="/api/v1/video_feed"
        alt="Video Feed"
        onLoad={() => setVideoLoad(true)}
      />
      {detected.length > 0 ? (
        <ul>
          {detected.map((face) => (
            <li key={face}>{face}</li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
export default Attendance;
