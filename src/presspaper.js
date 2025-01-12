const Property = new Parser()
    .endianess('little')
    .int32('name_length')
    .string('name', { encoding: 'ascii', length: 'name_length', stripNull: true })
    .choice('more', {
        tag: isNone,
        choices: {
        1: new Parser(),
        0: new Parser()
        .endianess('little')
        .int32('type_length')
        .string('type', { encoding: 'ascii', length: 'type_length', stripNull: true })
        .int32('size1') //int64: size
        .int32('size2')
        .choice('details', {
            tag: selectDataType,
            choices: {
                1: IntProperty,
                2: ArrayProperty,
                3: StrProperty,
                4: ByteProperty,
                5: QWordProperty,
                6: BoolProperty,
                7: FloatProperty
            }
        })
        }
    });

    const ArrayPropertyDetail = new Parser()
    .endianess('little')
    .int32('nl')
    .string('name', {encoding: 'ascii', length: 'nl', stripNull: true })
    .choice('more', {
        tag: isNone,
        choices: {
            1: new Parser(),
            0: new Parser()
            .endianess('little')
            .int32('tl')
            .string('type', {encoding: 'ascii', length: 'tl', stripNull: true})
            .int32('unkn1')
            .int32('unkn2')
            .choice('details', {
                tag: selectDataType,
                choices: {
                    1: IntProperty,
                    3: StrProperty,
                    4: ByteProperty,
                    5: QWordProperty,
                    6: BoolProperty,
                    7: FloatProperty
                }
            })
        }
    });
