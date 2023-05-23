import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
function Attendance() {
  const imgRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");

  return (
    <div>
      <img src={"/api/v1/video_feed"} alt="Video Feed" />
    </div>
  );
}
export default Attendance;
