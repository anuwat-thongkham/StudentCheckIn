

const RB=ReactBootstrap;
const {Alert, Card, Button, Table} = ReactBootstrap;


function TextInput({label,app,value,style}){
    return <label className="form-label">
    {label}:    
     <input className="form-control" style={style}
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }
  



  

 



class App extends React.Component {
    state = {
        showFooterContent: false, // เพิ่มตัวแปร state เพื่อควบคุมการแสดง/ซ่อนข้อมูลของ Card.Footer
        // ส่วนอื่น ๆ ของ state
      };
    
      // ฟังก์ชันสำหรับการคลิกปุ่มแสดง/ซ่อนข้อมูลของ Card.Footer
      toggleFooterContent = () => {
        this.setState((prevState) => ({
          showFooterContent: !prevState.showFooterContent,
        }));
      };

    title = (
      <Alert variant="info" style={{ backgroundColor: '#ffffff' }}>
        <b>เช็คชื่อ</b> สำหรับนักศึกษา
      </Alert>
    );
    //style={{ backgroundColor: "#6A0DAD", color: "white" }}
    state = {
        scene: 0,
        students:[],
        stdid:"",
        stdfname:"",
        stdlname:"",
        stdemail:"",
        newQuestion: "", // เพิ่ม state สำหรับเก็บคำถามใหม่
        questions: [], // เพิ่ม state สำหรับเก็บคำถามที่อาจารย์เพิ่ม
        
        
    }
    
    
      

    

    
    
    
    insertData(){
        db.collection("students").doc(this.state.stdid).set({
           fname : this.state.stdfname,
           lname : this.state.stdlname,
           email : this.state.stdemail,
           section : this.state.stdsection,
        });
    }
    edit(std){      
        this.setState({
         stdid    : std.id,
        
         stdfname : std.fname,
         stdlname : std.lname,
         stdemail : std.email,
         stdsection : std.section,
        
        })
     }
     
   
      
      checkStudentAttendance() {
        const stdCheckId = this.state.stdCheckId;
        db.collection("students").doc(stdCheckId).get().then((doc) => {
          if (doc.exists) {
            // นักศึกษาพบ
            const studentData = doc.data();
            const studentName = studentData.fname + " " + studentData.lname;
            
            const currentDate = new Date().toLocaleDateString();
            
            // ทำการเช็คชื่อใน collection checkin
            db.collection("check").add({
              subject: "Mobile",
              room: "SC9127",
              class_date: currentDate,
              id: stdCheckId
            }).then(() => {
              // แสดง pop up โดยผ่าน alert
              alert(`รหัสนักศึกษา: ${stdCheckId}, ชื่อ-สกุล: ${studentName}`);
              
              // อัปเดต state หรือทำการอื่น ๆ ตามต้องการ
            }).catch((error) => {
              console.error("เกิดข้อผิดพลาดในการเช็คชื่อ ", error);
            });
          } else {
            // ไม่พบนักศึกษา
            alert("ไม่พบนักศึกษาดังกล่าว");
          }
        }).catch((error) => {
          console.error("เกิดข้อผิดพลาดในการค้นหาข้อมูลนักศึกษา ", error);
        });
      }
      
      // เมื่อคลาส App ถูกโหลด ให้ดึงคำถามจาก Firestore และเซ็ต state


    // ฟังก์ชันเพิ่มคำถามลงใน Firestore
    /*
  addQuestionToDatabase = () => {
    const newQuestion = this.state.newQuestion;
    db.collection("questions")
      .add({ question: newQuestion })
      .then(() => {
        alert("เพิ่มคำถามเรียบร้อยแล้ว");
        // เมื่อเพิ่มคำถามลงในฐานข้อมูลเรียบร้อยแล้ว ทำการเคลียร์ค่าคำถามใน state
        this.setState({ newQuestion: "" });
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการเพิ่มคำถามในฐานข้อมูล: ", error);
      });
  };
  */

  // เมื่อคลาส App ถูกโหลด ให้ดึงคำถามจาก Firestore และเซ็ต state
  componentDidMount() {
    this.fetchQuestionsFromDatabase();
  }

  // ฟังก์ชันเพิ่มคำถามลงใน Firestore
  addQuestionToDatabase = () => {
    const newQuestion = this.state.newQuestion;
    db.collection("questions")
      .add({ question: newQuestion })
      .then(() => {
        alert("เพิ่มคำถามเรียบร้อยแล้ว");
        // เมื่อเพิ่มคำถามลงในฐานข้อมูลเรียบร้อยแล้ว ทำการเคลียร์ค่าคำถามใน state
        this.setState({ newQuestion: "" });
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการเพิ่มคำถามในฐานข้อมูล: ", error);
      });
  };

  // เมื่อคลาส App ถูกโหลด ให้ดึงคำถามจาก Firestore และเซ็ต state
  componentDidMount() {
    this.fetchQuestionsFromDatabase();
  }

  // ฟังก์ชันดึงคำถามจาก Firestore และเซ็ต state
  fetchQuestionsFromDatabase = () => {
    db.collection("questions")
      .get()
      .then((querySnapshot) => {
        const questions = [];
        querySnapshot.forEach((doc) => {
          questions.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ questions: questions });
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงคำถามจากฐานข้อมูล: ", error);
      });
  };

  // เมื่อผู้ใช้ตอบคำถาม
  answerQuestion = (questionId, answer) => {
    // อัปเดตข้อมูลใน Firestore หรือทำการตอบคำถามตามต้องการ
    db.collection("answers")
      .add({ questionId: questionId, answer: answer })
      .then(() => {
        alert("เพิ่มคำตอบเรียบร้อยแล้ว");
        // เมื่อเพิ่มคำตอบลงในฐานข้อมูลเรียบร้อยแล้ว ทำการเคลียร์ค่าคำตอบใน state
        this.setState({ [`answer_${questionId}`]: "" });
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการเพิ่มคำตอบในฐานข้อมูล: ", error);
      });
  };


      
 



    render() {
        // var stext = JSON.stringify(this.state.students);
        return (
          <Card style={{ textAlign: "center" }}>
            <Card.Header>{this.title}</Card.Header>
            <Card.Body>
              
           
            <TextInput label="รหัสนักศึกษา" app={this} value="stdCheckId" style={{width:120}}/><br/>
            <Button onClick={()=>this.checkStudentAttendance()} style={{ backgroundColor: '#560f74' }}>ยืนยัน</Button>
            
            <br></br>
       
            {/* แสดงรายการคำถาม */}
            <div>
    <br></br>
    <b>คำถาม :</b>
    <ul>
        {this.state.questions.map((question) => (
            <li key={question.id}>
                {question.question}
                {/* เพิ่มฟอร์มสำหรับตอบคำถาม */}
                <input
                    type="text"
                    value={this.state[`answer_${question.id}`] || ""}
                    onChange={(event) =>
                        this.setState({
                            [`answer_${question.id}`]: event.target.value,
                        })
                    }
                    style={{ backgroundColor: '#f2d7fe' }} // กำหนดสีพื้นหลังของช่อง input เป็นม่วงอ่อน
                />
                    
                <button
                    onClick={() =>
                        this.answerQuestion(question.id, this.state[`answer_${question.id}`])
                    }
                    style={{ backgroundColor: '#560f74', color: '#ffffff' }} // กำหนดสีของปุ่มเป็นสีม่วงเข้ม
                >
                    ตอบ
                </button>
            </li>
        ))}
    </ul>
</div>

            
            
            </Card.Body>

            <Card.Footer style={{ textAlign: "center" }}>
  {/* เมื่อคลิกปุ่ม "แสดง/ซ่อนข้อมูล" ให้แสดง/ซ่อนข้อมูลของ Card.Footer */}
  <Button onClick={this.toggleFooterContent} style={{ backgroundColor: '#f2d7fe' , color: 'black' }}>
    {this.state.showFooterContent ? 'ซ่อนการเพิ่มข้อมูลนักศึกษา' : 'เพิ่มข้อมูลนักศึกษา'}
  </Button>
  {this.state.showFooterContent && (
    <div>
      <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา </b><br/>
      <TextInput label="รหัศนักศึกษา" app={this} value="stdid" style={{width:120}}/>  
      <TextInput label="ชื่อ" app={this} value="stdfname" style={{width:120}}/>
      <TextInput label="สกุล" app={this} value="stdlname" style={{width:120}}/>
      <TextInput label="อีเมล" app={this} value="stdemail" style={{width:150}} /> 
      <TextInput label="กลุ่ม" app={this} value="stdsection" style={{width:150}} />        
      <Button onClick={()=>this.insertData()} style={{ backgroundColor: '#560f74' }}>บันทึก</Button>
    </div>
  )}
</Card.Footer>

        
          </Card>          
        );
      }
  
  
    
       
  }

  const firebaseConfig = {
    apiKey: "AIzaSyD6rz5gGWak1SsVY9HgYJnZ2Xo83ejzdvs",
    authDomain: "test-8517b.firebaseapp.com",
    projectId: "test-8517b",
    storageBucket: "test-8517b.appspot.com",
    messagingSenderId: "910179285225",
    appId: "1:910179285225:web:012ec239ff32decc25d878",
    measurementId: "G-CCWS2Z3W9B"
  };
    firebase.initializeApp(firebaseConfig);      
    const db = firebase.firestore();
    // db.collection("students").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} =>`,doc.data());
//   });
// });
  




// ระบุคอมโพเนนต์ที่ใช้สำหรับหน้าแรก
const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);

