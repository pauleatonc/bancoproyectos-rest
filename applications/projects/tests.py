from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Program, Type, Year, PrioritizedTag, Project, Projectimage, Projectfile
from django.core.files.uploadedfile import SimpleUploadedFile

class ProgramModelTest(TestCase):

    def test_create_program(self):
        Program.objects.create(name="Program 1", sigla="P1")
        self.assertEqual(Program.objects.count(), 1)
        print("Projects: Test de creación de programa: Ok")

    def test_str_representation(self):
        program = Program.objects.create(name="Program 1", sigla="P1")
        self.assertEqual(str(program), "P1")
        print("Projects: Test de representación de cadena de modelo programa: Ok")

class TypeModelTest(TestCase):
    def test_string_representation(self):
        type_ = Type.objects.create(name="Type1")
        self.assertEqual(str(type_), "Type1")
        print("Projects: Test de representación de cadena de modelo type: Ok")

    def test_type_unique(self): 
        Type.objects.create(name="UniqueType")
        new_type = Type(name="UniqueType")
        with self.assertRaises(ValidationError):
            new_type.full_clean()
            new_type.save()
        print("Projects: Test de validación de unicidad de modelo type: Ok")

class YearModelTest(TestCase):
    def test_string_representation(self):
        year = Year.objects.create(number="2021")
        self.assertEqual(str(year), "2021")
        print("Projects: Test de representación de cadena de modelo Year: Ok")

    def test_year_unique(self):
        Year.objects.create(number="2022")
        new_year = Year(number="2022")
        with self.assertRaises(ValidationError):
            new_year.full_clean()
            new_year.save()
        print("Projects: Test de validación de unicidad de modelo Year: Ok")

class PrioritizedTagModelTest(TestCase):
    def test_string_representation(self):
        tag = PrioritizedTag.objects.create(prioritized_tag="High")
        self.assertEqual(str(tag), "High")
        print("Projects: Test de representación de cadena de modelo PrioritizedTag: Ok")

    def test_tag_unique(self):
        PrioritizedTag.objects.create(prioritized_tag="Medium")
        new_tag = PrioritizedTag(prioritized_tag="Medium")
        with self.assertRaises(ValidationError):
            new_tag.full_clean()
            new_tag.save()
        print("Projects: Test de validación de unicidad de modelo PrioritizedTag: Ok")

class ProjectModelTest(TestCase):

    def setUp(self):
        self.year = Year.objects.create(number="2023")
        self.program = Program.objects.create(name="Program 1", sigla="P1")
        self.type = Type.objects.create(name="Type 1")

    def test_create_project(self):
        Project.objects.create(
            name="Project 1", 
            id_subdere="ID1", 
            description="Description", 
            year=self.year, 
            program=self.program, 
            type=self.type
        )
        self.assertEqual(Project.objects.count(), 1)
        print("Projects: Test de creación de proyectos: Ok")

    def test_project_slug(self):
        project = Project.objects.create(
            name="Project 1", 
            id_subdere="ID1", 
            description="Description", 
            year=self.year, 
            program=self.program, 
            type=self.type
        )
        self.assertIsNotNone(project.slug)
        print("Projects: Test de slug de proyectos: Ok")

class ProjectimageModelTest(TestCase):
    def test_file_upload(self):
        project = Project.objects.create(name="Project1", description="Description1")
    
        with open('static\images\color_SubDesarrollo.png', 'rb') as f:
            image_content = f.read()

        image = SimpleUploadedFile(name='color_SubDesarrollo.png', content=image_content, content_type='image/png')
        Projectimage.objects.create(project=project, image_carousel=image)
        self.assertEqual(Projectimage.objects.count(), 1)
        print("Projects: Test de subida y carga de modelo ProjectImage: Ok")

class ProjectfileModelTest(TestCase):
    def test_file_upload(self):
        project = Project.objects.create(name="Project2", description="Description2")
        file = SimpleUploadedFile(name='test_file.pdf', content=b'\x47\x11\x42\x40', content_type='application/pdf')
        Projectfile.objects.create(project=project, file=file, name="Document1")
        self.assertEqual(Projectfile.objects.count(), 1)
        print("Projects: Test de subida y carga de modelo Projectfile: Ok")
