const { PrismaClient } = require('@prisma/client');
const { calculateDuration } = require('../getDuration');
const prisma = new PrismaClient();

const createProject = async (req, res) => {
    try {
        const { project_name, start_date, end_date, description, technologies, upload_image } = req.body;
        const project = await prisma.project.create({
            data: { 
                name: project_name, 
                start_date, 
                end_date, 
                duration: calculateDuration(start_date, end_date), 
                description, 
                image_url: upload_image
            }
        });
        const tech = await prisma.tech.create({
            data: {
                next_js: technologies.next_js,
                node_js: technologies.node_js,
                react_js: technologies.react_js,
                typescript: technologies.typescript,
                project_id: project.id
            }
        });
        res.status(200).json({ data: project, technologies: tech });
    } catch (error) {
        res.status(500).json({ message: 'Server error', detail: error })
    }
}

const getAllProjects = async (req, res) => {
    try {
        const project = await prisma.project.findMany();
        res.status(200).json({ data: project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', detail: error })
    }
};

const getProjectById = async (req, res) => {
    try {
        console.log(typeof req.params.id);
        const project = await prisma.project.findFirst({
            where: { id: Number(req.params.id) },
            include: {
                technologies: true
            }
        });
        console.log(project)
        res.status(200).json({ data: project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', detail: error })
    }
};

const updateProjectById = async (req, res) => {
    try {
        const { name, start_date, end_date, description, technologies, image_url } = req.body;
        const project = await prisma.project.update({
            data: { name, start_date, end_date, duration: calculateDuration(start_date, end_date), description, image_url },
            where: { id: Number(req.params.id) }
        });
        const tech = await prisma.tech.update({
            data: {
                next_js: technologies.next_js,
                node_js: technologies.node_js,
                react_js: technologies.react_js,
                typescript: technologies.typescript,
            },
            where: {
                id: project.id
            }
        });
        res.status(200).json({ data: project, technologies: tech });
    } catch (error) {
        res.status(500).json({ message: 'Server error', detail: error })
    }
}

const deleteProjectById = async (req, res) => {
    try {
        const project = await prisma.project.delete({ where: { id: Number(req.params.id) }, include: { technologies: true }});
        res.status(200).json({ data: project });
    } catch (error) {
        res.status(500).json({ message: 'Server error', detail: error })
    }
}

module.exports = { createProject, getAllProjects, getProjectById, updateProjectById, deleteProjectById }