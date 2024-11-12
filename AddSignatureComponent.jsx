// import React, {
//   useState,
//   useRef,
//   useEffect,
//   useSyncExternalStore,
// } from "react";
// import {
//   Box,
//   Paper,
//   Button,
//   TextField,
//   Grid,
//   GlobalStyles,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";

// //import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider,} from "@mui/x-date-pickers/LocalizationProvider";
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateCalen } from "@mui/x-date-pickers/DesktopDatePicker";
// import dayjs from "dayjs";

// import * as pdfjsLib from "pdfjs-dist/webpack"; // Use Webpack helper to manage the worker
// import SignatureCanvas from "react-signature-canvas";

// const AddSignatureComponent = ({ pdf }) => {
//   const canvasContainerRef = useRef(null);
//   const canvasRefs = useRef([]);
//   const [numPages, setNumPages] = useState([]);
//   const [clickPosition, setClickPosition] = useState({ clickX: 0, clickY: 0 });
//   const [currentPage, setCurrentPage] = useState(1);

//   const [digitalSignature, setDigitalSignature] = useState(""); // Store text digital signature
//   const [signatureImage, setSignatureImage] = useState(null); // Store image signature
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog state for text signature
//   const [showSignatureCanvas, setShowSignatureCanvas] = useState(false); // Track canvas visibility
//   const [canvasSignature, setCanvasSignature] = useState(null); // Store canvas signature
//   const [open, setOpen] = useState(false);
//   const sigCanvasRef = useRef(null);

//   const [PlaceHolder, setPlaceHolder] = useState(null);
//   const [currentDatePlaceholder, setDatePlaceholder] = useState(null);
//   const [ctxValSignature, setCTXSignature] = useState(null);
//   const [ctxDate, setCtxDate] = useState(null);

//   const [signaturePositions, setSignaturePositions] = useState([]);
//   const [datePositions, setDatePositions] = useState([]);

//   const [dataFetched, setDataFetched] = useState(false);
//   const [placeholderWidth, setBoxWidth] = useState(105);
//   const [pplaceholderHeight, setBoxHeight] = useState(40);

//   //   const [placeholderWidth, setBoxWidth] = useState(200);
//   //   const [pplaceholderHeight, setBoxHeight] = useState(40);
//   const [currentdate, setCurrentDate] = useState(null);
//   const [openDatePicker, setDatePicker] = useState(false); // For controlling DatePicker open state

//   const datePickerRef = useRef(null); // Reference for the DatePicker
//   //const pdfRef = useRef(null);

// //   const dateCoordinates = [
// //     { x: 452, y: 90, w: 174, h: 40, pageNum: 1 }, // Example of a static signature coordinate
// //     { x: 397, y: 143, w: 174, h: 40, pageNum: 2 },
// //     { x: 456, y: 70, w: 174, h: 40, pageNum: 3 },
// //   ];

//   //   const signaturePositions = [
//   //     { x: 452, y: 90, w: 174, h: 40 , pageNum: 1 }, // Example of a static signature coordinate
//   //     { x: 397, y: 143, w: 174, h: 40 ,pageNum: 2 },
//   //     { x: 456, y: 70, w: 174, h: 40,pageNum: 3 },
//   //   ];


//   // CODE TO RETREIVE THE PDF FROM A LINK AND THEN RENDER IT ON CANVAS
//   //const [pdfLink, setPdfLink] = useState("https://connect.medtigo.com/files/77187997-4ec4-4e43-9ba2-9a1e7a1b8268.pdf"); // Set the link directly
   
// //   useEffect(() => {
// //     if (dataFetched && pdfLink) {
// //       handleOpenPDF(pdfLink); // Call to open the PDF after data is fetched
// //     }
// //   }, [dataFetched, pdfLink]); // Dependency on dataFetched and pdfLink




//     useEffect(() => {
//       const fetchData = async () => {
//         await fetchAllData(); // Fetch data from the server
//         setDataFetched(true); // Set state to indicate data has been fetched
//       };

//       fetchData(); // Initiate the data fetching
//     }, []); // This runs only once, on mount

//     useEffect(() => {
//       if (dataFetched) {
//         handleOpenPDF(); // Call to open the PDF after data is fetched
//       }
//     }, [dataFetched]); // Dependency on dataFetched state

//     async function fetchAllData() {
//       try {
//         const response = await fetch(
//           "https://dev.medtigo.com/api/v1/esignature/",
//           {
//             method: "GET", // Use GET to retrieve data
//           }
//         );

//         const data = await response.json();
//         console.log("Fetched data:", data);

//         // Process the retrieved data
//         processAllData(data); // Call a function to handle the data
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     }

//     const processAllData = async (data) => {
//       const {
//         note,
//         senderID,
//         recipientID,
//         senderEmail,
//         recipientEmail,
//         file, // Assuming file is a PDF or Blob
//         dateCoordinates,
//         fullnameCoordinates,
//         signatureCoordinates,
//       } = data;

//       console.log("Note:", note);
//       console.log("Sender ID:", senderID);
//       console.log("Recipient ID:", recipientID);
//       console.log("Sender Email:", senderEmail);
//       console.log("Recipient Email:", recipientEmail);
//       console.log("File:", file);

//       console.log("Date Coordinates:", dateCoordinates);
//       console.log("Full Name Coordinates:", fullnameCoordinates);
//       console.log("Signature Coordinates:", signatureCoordinates);

//       await setSignaturePositions(signatureCoordinates);
//       await setDatePositions(dateCoordinates);

//       // Load the PDF document and store it in pdfRef
//      // pdfRef.current = await pdfjsLib.getDocument({ data: file }).promise;

//       console.log("PDF loaded and stored in pdfRef");
//     };

//   useEffect(() => {
//     if (isDialogOpen) {
//       setDigitalSignature(""); // Reset the input field when the dialog opens
//     }
//   }, [isDialogOpen]);

// //   useEffect(() => {
// //     handleOpenPDF();
// //   }, []);



//   const handleClickOutside = (event) => {
//     if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
//       handleCloseDatePicker(); // Close the DatePicker if clicked outside
//     }
//   };

//   useEffect(() => {
//     // Add event listener when DatePicker is open
//     if (openDatePicker) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     // Cleanup the event listener on component unmount or when DatePicker closes
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [openDatePicker]); // Run this effect only when `openDatePicker` changes

//   const handleOpenPDF = async () => {
//     if (!pdf || !canvasContainerRef.current) return;

//     // const pdf = pdfRef.current; // Get the PDF document from the ref
//   // Load the PDF document from the provided link
// //   const loadingTask = pdfjsLib.getDocument(pdfLink);
// //   const pdf = await loadingTask.promise;

//     const container = canvasContainerRef.current;
//     container.innerHTML = ""; // Clear previous content
//     console.log("Opening PDF...");

//     canvasRefs.current = [];
//     console.log(pdf);

//     // Loop through all pages in the PDF
//     for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//       try {
//         const page = await pdf.getPage(pageNum); // Wait for the page to load
//         const viewport = page.getViewport({ scale: 1.5 });
//         const pageContainer = document.createElement("div");
//         // pageContainer.style.position = "relative";
//         pageContainer.style.marginBottom = "20px"; // Add spacing between pages

//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");

//         canvas.height = viewport.height;
//         canvas.width = viewport.width;
//         canvas.setAttribute("data-id", pageNum);
//         canvas.style.border = "1px solid #000";

//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport,
//         };

//         await page.render(renderContext).promise; // Wait for the page to render

//         console.log(`Rendered Page ${pageNum}`);
//         canvasRefs.current[pageNum - 1] = canvas;

//         setNumPages(pageNum);

//         pageContainer.appendChild(canvas); // Append canvas to the page container
//         container.appendChild(pageContainer);
//         //clearOldPlaceholders(context); // Clear old placeholders on the canvas

//         // Append page container to the main container
//         console.log(`Page ${pageNum} added to container`);
//         console.log(
//           `canvasContainerRef Dimensions - Width: ${canvasContainerRef.clientWidth}, Height: ${canvasContainerRef.clientHeight}`
//         );

//         console.log(
//           ` Container Dimensions - Width: ${container.clientWidth}, Height: ${container.clientHeight}`
//         );
//         console.log(
//           `Canvas - Width: ${canvas.clientWidth}, Height: ${canvas.clientHeight}`
//         );
//       } catch (error) {
//         console.error(`Error rendering page ${pageNum}:`, error);
//       }
//     }

//     console.log("All pages rendered");
//     //console.log("PAGE>>>>>>>>>>>>>>>>>>",dataArray);
//   };

//   const handleClickCanvas = (event) => {
//     let element = document.elementFromPoint(event.clientX, event.clientY);
//     console.log("Element found:", element);

//     // Ensure the element is a <canvas> before proceeding
//     if (!element || element.tagName.toLowerCase() !== "canvas") {
//       console.log("Element is not a canvas");
//       return;
//     }
//     // At this point, element is a canvas
//     let canvas = element;
//     let canvasId = canvas.dataset.id;
//     setCurrentPage(canvasId);

//     console.log("Canvas ID:", canvasId);
//     const ctx = canvas.getContext("2d");
//     if (!ctx) {
//       console.log("Unable to get canvas context");
//       return;
//     }

//     // const canvas = canvasRefs.current[currentPage - 1];
//     const rect = canvas.getBoundingClientRect();
//     const clickX = event.clientX - rect.left; // X position of click relative to the canvas
//     const clickY = event.clientY - rect.top; // Y position of click relative to the canvas
//     console.log(`Canvas clicked at: X = ${clickX}, Y = ${clickY}`);

//     console.log("Updated Signature Coordinates:", signaturePositions);
//     // Find the placeholder that was clicked
//     const signaturePlaceholder = signaturePositions.find(
//       (sig) =>
//         clickX >= sig.x &&
//         clickX <= sig.x + sig.w &&
//         clickY >= sig.y &&
//         clickY <= sig.y + sig.h
//     );

//     // Check if the click is inside the placeholder
//     if (signaturePlaceholder) {
//       //  if (!placeholder.hasSignature) {
//       // Add your signature drawing logic
//       setDigitalSignature("");

//       console.log("XXXX>>" + clickX);
//       console.log("YYYYY>>" + clickY);

//       console.log("NEWXXX>>" + signaturePlaceholder.x);
//       console.log("NEWYYYY>>" + signaturePlaceholder.y);

//       setPlaceHolder(signaturePlaceholder);
//       setCTXSignature(ctx);
//       setClickPosition({ clickX, clickY });
    
//       handleClickOpen(); // Call your function to open the dialog/modal
//       // Optionally, you can clear the placeholder text by not drawing it again
//       console.log("Signature added to placeholder");
//     } else {
//       console.log("Click is outside the placeholder");
//     }

//     // Check if the click is on a date placeholder
//     const datePlaceholder = datePositions.find(
//       (date) =>
//         clickX >= date.x &&
//         clickX <= date.x + date.w &&
//         clickY >= date.y &&
//         clickY <= date.y + date.h
//     );

//     if (datePlaceholder) {
//       console.log("Date placeholder clicked", datePlaceholder);

//       setDatePlaceholder(datePlaceholder); // Store the clicked date placeholder
//       setCtxDate(ctx); // Save the canvas context for future drawing
//       setClickPosition({ clickX, clickY });
//       //  handleDatePicker(); // Open the date picker popup
//       console.log("bbbbbbbb>>>>>"+clickX);
     
//       handleOpenDatePicker();
//     } else {
//       console.log("Click is outside the date placeholder");
//     }
//   };

//   //Function to iterate through all date coordinates
//   const updateDatePlaceholdersOneByOne = async (newDate) => {
//     for (const coord of datePositions) {
//       setDatePlaceholder(coord); // Update the current date placeholder
//       await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for a short duration (optional)
//       console.log("Current date placeholder:", currentDatePlaceholder);
//       console.log("POSUNITY>>>>>"+clickPosition.x);
//       updateAllDates(newDate); // Update the date at the current placeholder
//     }
//   };

//   const updateAllDates = (newDate) => {
//     datePositions.forEach((coord) => {
//       console.log("Updating date at:", coord);
//       drawDateAtPosition(
//         newDate,
//         coord.x,
//         coord.y,
//         coord.w,
//         coord.h,
//         coord.pageNum
//       );
//     });
//   };

//   // UseEffect to react to currentDatePlaceholder changes
//   useEffect(() => {
//     if (currentDatePlaceholder) {
//       console.log("Current date placeholder changed:", currentDatePlaceholder);
//       // You can also perform other updates here if needed
//     }
//   }, [currentDatePlaceholder]);

//   const drawDateAtPosition = (date, x, y, w, h, pagenum) => {
//     const canvas = canvasRefs.current[pagenum - 1];
//     const context = canvas.getContext("2d");

//     context.clearRect(x, y, w, h, pagenum); // Clear old date (if needed)
//     // ctx.font = "16px Arial";
//     // ctx.fillText(date, coord.x, coord.y,coord.w,coord.h); // Draw new date

//     context.font = "500 20px 'Pacifico', cursive";
//   context.fillStyle = "black"; // Set text color
//   context.textAlign = "center"; // Center the text
//   context.textBaseline = "middle"; // Align the text vertically

//   // Measure text dimensions
//   const textMetrics = context.measureText(date);
//   const textWidth = textMetrics.width;
//   const textHeight = 20; // Use a fixed height based on font size

//   // Calculate padding for the box
//   const padding = 10;
//   const boxWidth = textWidth + padding * 2; // Box width including padding
//   const boxHeight = textHeight + padding; // Box height including padding

//   // Draw the rectangle
//   context.fillStyle = "#EBF5FF"; // Set box color
//   context.fillRect(x, y, boxWidth, boxHeight); // Draw the box

//   // Draw the text centered within the box
//   context.fillStyle = "black"; // Set text color
//   context.fillText(date, x + boxWidth / 2, y + boxHeight / 2); // Draw the text

//   };

//   // Function to draw signature (you need to implement this)
//   function drawSignature(ctx, x, y, w, h, signature) {
//     // Clear the previous signature in the area

//     ctx.clearRect(x, y, w, h);

//     ctx.fillRect(x, y, w, h);
//     // Common style for the signature box
//     ctx.fillStyle = "#EBF5FF";

//     // Handle different types of signatures
//     if (typeof signature === "string") {
//       // Case 1: Digital signature (text)

//       ctx.clearRect(x, y, placeholderWidth, pplaceholderHeight);
//       console.log("START>>>" + placeholderWidth);
//       console.log("START>>>" + pplaceholderHeight);
//       // Common style for the signature box
//       ctx.fillStyle = "#EBF5FF";
//       // ctx.fillRect(x, y, w, h); // Draw the rectangle for the signature

//       console.log("Clearing placeholder at: ", x, y, w, h);
//       console.log("Drawing signature at: ", x, y, w, h);

//       let textWidth = ctx.measureText(signature).width;
//       let boxWidth = textWidth + 20; // Adding padding for the text
//       let boxHeight = 40; // Fixed height for the text signature bo

//       const adjustedWidth = Math.min(boxWidth, w); // Limit box width to placeholder width
//       const adjustedHeight = Math.min(boxHeight, h); // Limit box height to placeholder height

//       // Clear the placeholder area again to ensure no background color remains
//       ctx.clearRect(x, y, w, h);

//       // Fill the adjusted text box area
//       ctx.fillRect(x, y, adjustedWidth, adjustedHeight);

//       // Set text styles
//       ctx.font = "500 20px 'Pacifico', cursive";
//       ctx.fillStyle = "black"; // Text color
//       ctx.textAlign = "center"; // Center the text horizontally
//       ctx.textBaseline = "middle"; // Center the text vertically

//       // Draw the text centered in the adjusted box
//       ctx.fillText(signature, x + adjustedWidth / 2, y + adjustedHeight / 2);
//       setBoxWidth(adjustedWidth);
//       setBoxHeight(adjustedHeight);
//       console.log("BOX>>>" + boxWidth);
//       console.log("BOX>>>" + boxHeight);
//     } else if (signature instanceof Image) {
//       // Case 2: Image signature
//       console.log("Image>>>");

//       ctx.clearRect(x, y, placeholderWidth, pplaceholderHeight);
//       ctx.fillRect(x, y, w, h); // Draw the rectangle for the signature

//       // Common style for the signature box
//       ctx.fillStyle = "#EBF5FF";

//       ctx.drawImage(signature, x, y, w, h); // Draw the image inside the rectangle
//     } else {
//       console.error(
//         "Unsupported signature type. Must be a string, image, or canvas."
//       );
//     }
//   }

//   const handleClickOpen = () => {
//     setDigitalSignature("");
//     setOpen(true); // Open the dialog
//   };

//   const handleClose = () => {
//     setOpen(false); // Close the dialog
//   };

//   // ADD TEXT SIGNATURESS
//   const handleAddDigitalSignature = () => {
//     const canvas = canvasRefs.current[currentPage - 1];
//     const context = canvas.getContext("2d");
//     context.font = "20px 'Pacifico', cursive"; // Set font style
//     context.fillStyle = "black"; // Set text color
//     //context.clearRect(clickPosition.x, clickPosition.y, 30, 150);

//     drawSignature(
//       ctxValSignature,
//       PlaceHolder.x,
//       PlaceHolder.y,
//       PlaceHolder.w,
//       PlaceHolder.h,
//       digitalSignature
//     );

//     // context.fillText(
//     //   digitalSignature,
//     //   clickPosition.clickX,
//     //   clickPosition.clickY
//     // );
//     // Draw the text signature
//   };

//   // Handle image signature selection
//   const handleImageSignatureChange = (event) => {
//     console.log("OPENED IMAGE");
//     setSignatureImage(null);
//     const file = event.target.files[0];
//     console.log("OPENED ccc");
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSignatureImage(reader.result); // Set the image signature
//         console.log("Image Signature Loaded:", reader.result);
//       };
//       reader.readAsDataURL(file); // Read the file as Data URL
//     }
//   };

//   // Effect to run after signatureImage changes
//   useEffect(() => {
//     if (signatureImage) {
//       handleAddSignature();
//     }
//   }, [signatureImage]);

//   // Add the image signature to the PDF
//   const handleAddSignature = () => {
//     console.log("Added Image Signature");
//     const canvas = canvasRefs.current[currentPage - 1];
//     const context = canvas.getContext("2d");
//     const img = new Image();
//     img.src = signatureImage;
//     // ctx.clearRect(
//     //   placeholderPos.x - ctx.lineWidth, // Adjust x to clear extra space for border
//     //   placeholderPos.y - ctx.lineWidth, // Adjust y similarly
//     //   boxWidth + 2 * ctx.lineWidth, // Add extra space for the stroke width
//     //   boxHeight + 2 * ctx.lineWidth // Add extra space for the stroke width
//     // );
//     // Redraw the border
//     img.onload = () => {
//       //   context.drawImage(
//       //     img,
//       //     clickPosition.clickX,
//       //     clickPosition.clickY,
//       //     100,
//       //     50
//       //   );

//       drawSignature(
//         ctxValSignature,
//         PlaceHolder.x,
//         PlaceHolder.y,
//         PlaceHolder.w,
//         PlaceHolder.h,
//         img
//       );
//       handleClose(); // Draw the image signature
//     };
//     img.onerror = (error) => {
//       console.error("Error loading image:", error);
//     };
//   };

//   const DrawSignature = () => {
//     const signatureDataUrl = sigCanvasRef.current
//       .getTrimmedCanvas()
//       .toDataURL("image/png");
//     setCanvasSignature(signatureDataUrl); // Save the canvas signature
//     setShowSignatureCanvas(false); // Hide the canvas
//   };
//   // Effect to run after signatureImage changes
//   useEffect(() => {
//     if (canvasSignature) {
//       handleSaveCanvasSignature();
//     }
//   }, [canvasSignature]);

//   // Add disgital signatures
//   const handleSaveCanvasSignature = () => {
//     const canvas = canvasRefs.current[currentPage - 1];
//     const context = canvas.getContext("2d");
//     setCTXSignature(context);
//     const img = new Image();
//     img.src = canvasSignature;
//     img.onload = () => {
//       drawSignature(
//         ctxValSignature,
//         PlaceHolder.x,
//         PlaceHolder.y,
//         PlaceHolder.w,
//         PlaceHolder.h,
//         img
//       );

//       //   context.drawImage(
//       //     img,
//       //     clickPosition.clickX,
//       //     clickPosition.clickY,
//       //     100,
//       //     50
//       //   ); // Draw the canvas signature
//     };
//     img.onerror = (error) => {
//       console.error("Error loading canvas signature:", error);
//     };
//   };

//   const handleOpenDatePicker = () => {
//     setDatePicker(true);
//     //setCurrentDate(newValue);
//   };

//   // Handle closing of DatePicker
//   const handleCloseDatePicker = () => {
//     setDatePicker(false);
//   };

//   return (
//     <>
//       <GlobalStyles
//         styles={{
//           ".pdfCont > div::-webkit-scrollbar": {
//             width: "10px",
//           },
//           ".pdfCont > div::-webkit-scrollbar-track": {
//             background: "#f1f1f1",
//           },
//           ".pdfCont > div::-webkit-scrollbar-thumb": {
//             background: "#888",
//           },
//           ".pdfCont > div::-webkit-scrollbar-thumb:hover": {
//             background: "#555",
//           },
//         }}
//       />
//       <Box sx={{ bgcolor: "#f5f5f5", p: 3 }}>
//         <Paper elevation={3} sx={{ p: 3, mx: "auto" }}>
//           <Grid
//             container
//             spacing={2}
//             justifyContent="space-between"
//             alignItems="center"
//             mb={2}
//           >
//             {/* <Grid item>
//             <Button
//               variant="outlined"
//               draggable
//               onDragStart={() => handleDragStart("signature")}
//               onDragOver={(event) => handleDragOver(event)}
//               onDragEnd={(event) => handleDrop(event)}
//               sx={{ mr: 1 }}
//             >
//               ADD SIGNATURE
//             </Button>
//             <Button
//               variant="outlined"
//               draggable
//               onDragStart={() => handleDragStart("date")}
//               onDragOver={(event) => handleDragOver(event)}
//               onDragEnd={(event) => handleDrop(event)}
//               sx={{ mr: 1 }}
//             >
//               DATE
//             </Button>
//             <Button
//               variant="outlined"
//               draggable
//               onDragStart={() => handleDragStart("fullname")}
//               onDragOver={(event) => handleDragOver(event)}
//               onDragEnd={(event) => handleDrop(event)}
//               sx={{ mr: 1 }}
//             >
//               FULL NAME
//             </Button>
//           </Grid> */}
//             {/* <Grid item>
//             <Button variant="outlined" sx={{ mr: 1 }}>
//               GO BACK
//             </Button>
//             <Button variant="contained" onClick={handleSendClick}>
//               SEND
//             </Button>
//           </Grid> */}
//           </Grid>

//           <div className="pdfCont">
//             <Box
//               sx={{
//                 height: "70vh",
//                 width: "100%",
//                 mb: 2,
//                 display: "flex",
//                 justifyContent: "center",
//                 overflowY: "scroll",
//                 border: "2px solid black",
//               }}
//             >
//               {/* Design update - S */}
//               <Box
//                 ref={canvasContainerRef}
//                 style={{
//                   marginTop: "20px",
//                   backgroundColor: "white",
//                   width: "max-content",
//                 }}
//                 onClick={handleClickCanvas}
//               >
//                 {/* PDF pages will be rendered here */}
//               </Box>

              
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//   {openDatePicker && (
//     <div
//       style={{
//        position: "absolute", // Absolute positioning for custom placement
//         top: clickPosition.y ,
//         left: clickPosition.x,
//         backgroundColor: "white", // Optional: add background color to make it visible
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         zIndex: 1000, // Ensure it appears above other elements
//       }}
//       ref={datePickerRef}
//     >
//               <DateCalendar
//                //label="Controlled picker"
//                value={currentdate}
//                onChange={(newValue) => {
//                  setCurrentDate(newValue); // Update the date
//                  const formattedDate = newValue.format("MMMM D, YYYY"); // Format as Month Day, Year
//                  console.log("Selected Date:", formattedDate); // Log formatted date
//                  handleCloseDatePicker(); // Close DatePicker after date is selected
//                  updateDatePlaceholdersOneByOne(formattedDate); // Use formatted date if necessary
//                }}
//                sx={{
//                 // Adjust the size using sx prop (if using MUI v5)
//                 width: '250px', // Set a specific width
//                 height: '250px', // Set a specific height
//               }}
//               open={openDatePicker} // Control whether DatePicker is open
//                onClose={handleCloseDatePicker} // Close DatePicker when clicking outside or selecting a date
         
//               />
//            </div>
//          )}
//        </LocalizationProvider>


//             </Box>
//           </div>
//         </Paper>

//         {/* Dialog for adding text digital signature */}
//         <Dialog
//           open={isDialogOpen}
//           onClose={() => {
//             setIsDialogOpen(false); // Method 1: Close the dialog
//           }}
//         >
//           <DialogTitle>Add Text Digital Signature</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Enter Your Name"
//               fullWidth
//               variant="standard"
//               value={digitalSignature}
//               onChange={(e) => setDigitalSignature(e.target.value)} // Update digital signature state
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
//             <Button
//               onClick={() => {
//                 handleClose();
//                 handleAddDigitalSignature(); // Add the text signature
//                 setIsDialogOpen(false); // Close the dialog
//               }}
//             >
//               Add Signature
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <div>
//           <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Choose an Action</DialogTitle>
//             <DialogContent>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-around",
//                   gap: "10px",
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   onClick={() => setIsDialogOpen(true)}
//                   color="primary"
//                 >
//                   Text Signature
//                 </Button>
//                 <Button variant="contained" component="label" color="primary">
//                   Image Signature
//                   <input
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     onChange={handleImageSignatureChange}
//                   />
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={() => setShowSignatureCanvas(true)}
//                   color="primary"
//                 >
//                   Digital Signature
//                 </Button>
//                 {/* 
//               <Button variant="contained" onClick={handleDownloadPDF}>
//           Download Edited PDF
//         </Button> */}
//               </div>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose} color="secondary">
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </div>

//         {/* //  Dialog for the signature canvas */}
//         <Dialog
//           open={showSignatureCanvas}
//           onClose={() => setShowSignatureCanvas(false)}
//           fullWidth
//           maxWidth="sm"
//         >
//           <DialogTitle>Draw Your Signature</DialogTitle>
//           <DialogContent>
//             {/* Signature Canvas */}
//             <SignatureCanvas
//               ref={sigCanvasRef}
//               penColor="black"
//               canvasProps={{
//                 width: 500,
//                 height: 200,
//                 style: { border: "1px solid black" },
//               }}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button
//               variant="contained"
//               onClick={() => {
//                 DrawSignature();
//                 handleClose();
//               }}
//             >
//               Save Signature
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={() => setShowSignatureCanvas(false)}
//             >
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </>
//   );
// };

// export default AddSignatureComponent;

