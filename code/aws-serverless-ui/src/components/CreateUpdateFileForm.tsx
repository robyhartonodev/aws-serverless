import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

interface CreateUpdateFileFormProps {
    mode: 'create' | 'update';
}

const CreateUpdateFileForm: FC<CreateUpdateFileFormProps> = ({ mode }) => {
    const formSchema = z.object({
        id: z.string(),
        userId: z.string(),
        title: z.string(),
        imageUrl: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            userId: "",
            title: "",
            imageUrl: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={mode === 'create' ? 'bg-green-500' : 'bg-blue-500'}>
                    {mode === "create" ? "Create" : "Edit"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create user file</DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Id</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Id" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button variant="outline">Submit</Button>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

export default CreateUpdateFileForm;