import { Router,Request,Response } from "express";
import { getRepository } from "typeorm";
import { Student } from '../entities/Student';
import { get } from "http";
const router=Router();

// router.get('/',(req:Request,res:Response)=>{
    //res.json({message: `Method Get`});
//})
router.get('/', async(req:Request,res:Response)=>{
    const students=await getRepository(Student).find();
    res.json({message: `Method Get`, data:students});
});
router.get(`/:id`,async(req:Request,res:Response)=>{
    const student = await getRepository(Student).findOneBy({ id: parseInt(req.params.id, 10)});
    res.json({message:`Method Get ID`, data:student });
});
// router.get(`/:id`,(req:Request,res:Response)=>{
    // res.json({message:`Method Get ID : ${req.params.id}`});
// })
//router.post('/',(req:Request,res:Response)=>{
    //res.json({message: `Method Post`});
//})
router.post('/', async (req: Request, res: Response) => {
    const newStudent = await getRepository(Student).create(req.body);
    const result = await getRepository(Student).save(newStudent);
    res.json({message: 'Method post', data: result })
});
// router.put('/',(req:Request,res:Response)=>{
//     res.json({message: `Method Put`});
// })
router.put('/:id', async (req:Request,res:Response)=>{
    const student = await getRepository(Student).findOne({where:{ id: parseInt(req.params.id, 10)}});
    if(student){
        getRepository(Student).merge(student,req.body);
        const result =getRepository(Student).save(student);
        res.json({message: `Method Put`, data: result});
    }else{
    res.json({message: 'Student does not exist'});
    }
});

// router.delete('/',(req:Request,res:Response)=>{
//     res.json({message: `Method Delete`});
// })

router.delete('/:id',async(req:Request,res:Response)=>{
    getRepository (Student).delete(req.params.id);
    res.json({message: `Method Delete ID:${req.params.id}`});
})

export default router;