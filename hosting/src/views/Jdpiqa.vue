<template>
    <div>
        <span>
            Java design pattern app --- {{ qnas ? `${qnas.length}` : 0 }} questions
        </span>
        <p>
            <Button type="default" @click="save">Save</Button>
            <Button type="primary" @click="add">Add</Button>
            <Button type="success" @click="refresh">Refresh</Button>
        </p>

        <ul>
            <li v-for="qna in qnas" :key="qna.id">
                <div>
                    <Input v-model="qna.question" type="textarea"
                    :rows="4" style="width: 30vw"
                    placeholder="Enter something..." />
                    <Input v-model="qna.answer" type="textarea" :rows="4" placeholder="Enter something..." style="width: 30vw" />
                    <Button type="warning" @click="deleteQ(qna)">Delete</Button>
                </div>
            </li>
        </ul>    
    </div>
</template>

<script>
import uiMixin from '@/mixins/uiMixin'

export default {
    mixins: [uiMixin],
    data() {
        return {
            qnas: null
        }
    },
    beforeRouteLeave(to, from, next) {
        this.vuexModuleRegistrationManager.unregisterVuexModules(this.constants.jdpiqa.modules)
        next()
    },
    created() {
        this.refresh()
    },
    methods: {
        async getQnAs() {
            const result = await this.services
            .qnaService
            .getQnA()

            this.qnas = result.data
            // console.log(this.qnas)
        },
        async save() {
            try {
                await this.services.qnaService.saveqna({ qnas: this.qnas })

                this.$Message.success('Saved successfully')

                this.refresh()
            } catch(error) {
                this.$Message.error('Saving failed')
            }
        },
        add() {
            if (!this.qnas) {
                this.qnas = []
            }

            this.qnas.splice(0, 0, { question: null, answer: null })
        },
        async deleteQ(qna) {
            if (!qna.id) {
                this.qnas.splice(this.qnas.indexOf(qna), 1 )
                return
            }
            
            try {
                const toDelete = [qna]
                const onDeleteResult = await this.services.qnaService.deleteqna({ qnas: toDelete })
                
                toDelete.forEach(q => this.qnas.splice(this.qnas.indexOf(q), 1 ))
                this.$Message.success('Deleted successfully')
            } catch(error) {
                console.log(error)
                this.$Message.error(error.message)
            }

        },
        refresh() {
            this.getQnAs()
        }
    }
}
</script>

