const options = {
  form: {
    'label-width': 125,
    'label-position': 'left'
  },
  submitBtn: {
    props: {
      type: 'primary'
    }
  },
  resetBtn: false,
  onSubmit: function (formData) {
    alert(JSON.stringify(formData))
  }
}

const rule = [
  {
    type: 'Input',
    field: 'name',
    title: '群組名稱',
    props: {
      placeholder: '請輸入群組名稱...'
    },
    info: '',
    validate: [
      {
        trigger: 'blur',
        mode: 'required',
        message: '群組名稱不得為空',
        required: true,
        type: 'string'
      }
    ],
    children: [
      {
        type: 'icon',
        props: {
          type: 'ios-contact'
        },
        slot: 'prefix'
      },
      {
        type: 'icon',
        props: {
          type: 'ios-search'
        },
        slot: 'suffix'
      }
    ],
    hidden: false,
    display: true
  },
  {
    type: 'Input',
    field: 'comment',
    title: '備註',
    props: {
      placeholder: '請輸入備註...'
    },
    info: '',
    hidden: false,
    display: true
  },
  {
    type: 'Row',
    props: {
      type: 'flex',
      gutter: 8
    },
    children: [
      {
        type: 'Col',
        props: {
          span: 12
        },
        children: [
          {
            type: 'Radio',
            field: 'license',
            title: '授權',
            info: '',
            props: {
              type: 'button'
            },
            value: -1,
            options: [
              { value: 1, label: '有限' },
              { value: -1, label: '無限' }
            ],
            validate: [
              { required: true, type: 'number', message: '請選擇授權模式...', trigger: 'change' }
            ],
            hidden: false,
            display: true
          }
        ],
        hidden: false,
        display: true
      },
      {
        type: 'Col',
        props: {
          span: 12
        },
        children: [
          {
            type: 'InputNumber',
            field: 'count',
            title: '授權數量',
            info: '有限授權下，最少為 1',
            props: {
              min: 1
            },
            value: 1,
            validate: [
              {
                trigger: 'blur',
                mode: 'required',
                message: '請填入授權數量',
                required: true,
                type: 'number'
              }
            ],
            hidden: false,
            display: true
          }
        ],
        hidden: false,
        display: true
      }
    ],
    hidden: false,
    display: true
  },
  {
    type: 'span',
    title: '授權維護清單',
    native: false,
    children: [],
    hidden: false,
    display: true
  },
  {
    type: 'Button',
    children: ['方式1']
  },
  {
    type: 'Button',
    children: [{
      type: 'icon',
      props: {
        type: 'md-add'
      }
    }, ' 方式2']
  }
]

const transferColumns = [
  { key: 'label', title: '軟體名稱' },
  { key: 'Version', title: '軟體版本' }
]

export { options, rule, transferColumns }
