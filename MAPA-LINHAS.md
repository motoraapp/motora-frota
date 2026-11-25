# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 25/11/2026, 11:39:34. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13804 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- pdf-lib para gerar contratos em A4 profissional -->
24: <!-- Gera o QR code do Pix a partir do copia e cola -->
26: <!-- Supabase (banco de dados online) -->
142: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
147: <!-- Header Principal -->
161: <!-- Controles do Header -->
163: <!-- Botão Status Online/Offline (Motorista) -->
171: <!-- Ativar Notificações -->
176: <!-- Temas -->
181: <!-- Logout Button -->
190: <!-- Conteúdo Principal -->
193: <!-- TELA DE LOGIN -->
194: #secLogin
227: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
228: #secDemoEscolha
243: <!-- TELA PÚBLICA DE ASSINATURA OFICIAL VIA GOV.BR (?assinar=token) -->
244: #secGovBrInvite
258: <!-- PAINEL DO MOTORISTA -->
259: #secDriverPanel
261: <!-- Card do Veículo Vinculado -->
275: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
286: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
291: <!-- Aviso: nova versão do app Android -->
294: <!-- Aviso vermelho: notificações desligadas -->
297: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
301: <!-- Aviso de Pix / pagamento pendente -->
304: <!-- Navegação de Abas -->
322: <!-- Conteúdo das Abas Motorista -->
325: <!-- Aba CRLV-e -->
326: #tabDrvCrlv
331: <!-- Renderizado dinamicamente -->
335: <!-- Aba Contrato -->
336: #tabDrvContract
346: <!-- Renderizado dinamicamente -->
350: <!-- Aba Vistoria -->
351: #tabDrvInspection
358: <!-- Aba Pagamento -->
359: #tabDrvPayment
372: <!-- Caução e multas do motorista -->
374: <!-- Valor e descrição da cobrança -->
384: <!-- Seção Pix -->
398: <!-- QR Code Renderizado aqui -->
431: <!-- Seção Upload de Comprovante -->
448: <!-- Lista de comprovantes -->
453: <!-- Recibos quando o contrato está encerrado -->
460: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
461: #secMasterPanel
501: <!-- Aviso: falta criar a tabela dos termos no banco -->
504: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
506: <!-- Lista de Veículos -->
522: <!-- Renderizado via JS -->
529: <!-- Form de Adicionar Veículo -->
576: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
676: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
682: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
687: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
692: <!-- Fichas Arquivadas (após marcar caução pago) -->
701: <!-- Form de Adicionar Motorista -->
796: <!-- Barra de baixo do dono (só no design novo) -->
807: <!-- MODAL PRIMEIRO LOGIN -->
808: #modalFirstLogin
842: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
843: #modalNotif
856: <!-- MODAL VISTORIA (MASTER) -->
857: #modalInspection
870: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
871: #modalSettings
1011: <!-- MODAL TEMAS -->
1012: #modalThemes
1023: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1024: #modalCreds
1039: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1054: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1055: #modalDriverFile
1097: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1101: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1130: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1145: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1187: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1188: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1189: #modalRecibo
1208: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1209: #modalPixArea
1225: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1226: #modalIA
1308: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1309: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1310: #modalEditVeh
1347: #modalSenha
1370: #modalAvisoDev
1396: #modalMeusRecibos
1414: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1415: #modalEmail
1435: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1436: #modalReport
1451: #modalFinCardDetail
1464: #modalFinance
1497: <!-- FILTROS -->
1547: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1567: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1568: #modalExpenses
1603: <!-- MODAL NOVO PIX -->
1604: #modalNewPix
1656: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1714: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1715: #modalCorrigirRecibo
1729: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1730: #modalContractWizard
1746: <!-- Seleção Motorista & Veículo -->
1758: <!-- Locador -->
1779: <!-- Locatário -->
1800: <!-- Veículo -->
1823: <!-- Configuração Comercial -->
1899: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1967: <!-- Cláusulas editáveis -->
1979: <!-- Prévia -->
1993: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1994: #modalContractDetail
2007: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
2008: #modalInspectionTerm
2069: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2092: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2132: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2133: #modalInspectionTermDetail
2146: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2147: #modalInspDamageConfirm
2162: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2163: #modalDocViewer
2171: #modalDocBody
2172: <!-- Conteúdo pré-visualizado -->
2178: #modalTerms
2192: <!-- NOTIFICAÇÕES TOAST -->
2209: lsGet()
2210: lsSet()
2211: lsDel()
2234: demoLoginRole()
2238: demoId()
2239: demoSave()
2240: demoSaved()
2242: *datas no horário de Brasília*
2243: demoLocal()
2244: demoParts()
2245: demoDay()
2246: demoNextDue()
2251: *dados fictícios (4 meses)*
2252: demoBuild()
2485: *documentos fictícios (imagem gerada na hora)*
2486: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2487: demoDocBlob()
2565: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2566: demoQuery()
2589: out()
2595: run()
2636: demoOnUpdate()
2646: demoOnInsert()
2778: demoClient()
2981: demoStart()
2989: demoStop()
2995: abrirDemo()
3002: trocarDemo()
3007: demoBanner()
3022: toEmail()
3026: showLogin()
3030: esc()
3035: toBRTInput()
3048: parseBRTInputToIso()
3057: dataHoraBR()
3071: uiDialogo()
3119: uiConfirm()
3128: uiPrompt()
3134: friendlyError()
3144: unwrapInvokeResult()
3164: devicePrefs()
3167: saveDevicePrefs()
3170: docRef()
3171: viewDocIdx()
3173: setBusy()
3216: **TEMAS**
3225: currentTheme()
3230: applyTheme()
3231: openThemes()
3241: pickTheme()
3247: toggleDarkMode()
3249: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3251: loadDesignCfg()
3258: applyDesign()
3275: markMasterNav()
3282: fillDesignCfg()
3287: saveDesign()
3301: showToast()
3310: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3311: senhaErro()
3312: abrirSenha()
3321: salvarIaCodigo()
3331: fecharSenha()
3332: salvarSenha()
3353: loginUserInput()
3358: loginErro()
3362: verSenha()
3367: handleLogin()
3416: logout()
3435: saveFirstLoginPreferences()
3458: carregarDados()
3490: aplicarDados()
3531: loadAndRender()
3558: autoRefresh()
3597: markUpdated()
3602: reload()
3607: renderApp()
3655: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3658: masterBack()
3660: viewAsDriver()
3682: exitViewAs()
3701: viewOnly()
3702: renderViewAsBanner()
3712: showSection()
3717: withBtn()
3725: toggleDriverStatus()
3734: isOnline()
3736: updateStatusToggleUI()
3749: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3758: checkApkUpdate()
3773: updateInstallApkButton()
3793: renderDriverPanel()
4052: switchDriverTab()
4067: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
4070: parsePixKey()
4074: normalizePixKey()
4082: pixKeyLooksOk()
4090: togglePixKeyFields()
4096: updatePixKeyPlaceholder()
4102: copyPixKey()
4109: copyPixCode()
4121: receiptBadge()
4131: receiptMasterBox()
4158: receiptAction()
4165: confirmReceipt()
4194: rejectReceipt()
4206: recheckReceipt()
4215: uploadReceipt()
4238: switchMasterTab()
4257: maskPhone()
4266: waLink()
4271: allVeh()
4272: allDrv()
4273: chargeVehicleId()
4285: enviarPedidoParcialAsaas()
4301: pedirPixParcial()
4319: restaurarPixTotal()
4325: responderPixParcial()
4349: contrato30Info()
4379: encerrarContrato()
4396: encerrarContratoPrompt()
4409: reativarContrato()
4433: marcarCaucaoPagoArquivar()
4454: desarquivarFicha()
4472: deliveryInspectionHtml()
4511: uploadDeliveryPhotos()
4538: delDeliveryPhoto()
4556: addCauDesconto()
4581: puxarMultaCaucao()
4602: delCauDesconto()
4624: dfCauDescontosHtml()
4657: dfContratoRender()
4701: encerrarContratoConfirmFicha()
4708: renderMasterPanel()
4873: renderArchivedDrivers()
4918: handleAddVehicle()
4958: deleteVehicle()
4959: cancelDeleteVehicle()
4961: confirmDeleteVehicle()
4985: abrirEditarVeiculo()
5007: evReadStoredCrlv()
5032: evReadChosenCrlv()
5048: fecharEditarVeiculo()
5049: salvarEditarVeiculo()
5086: drvCauMostra()
5093: drvCauLer()
5101: handleAddDriver()
5179: marcarSituacao()
5189: updateDriverPaymentStatus()
5200: cobrancaAberta()
5204: proximoDiaISO()
5205: mudarDiaPagamento()
5216: aplicarDiaPagamento()
5246: deleteDriver()
5247: cancelDeleteDriver()
5249: confirmDeleteDriver()
5271: isImageFile()
5273: prepareFile()
5295: uploadFile()
5306: fileUrl()
5317: downloadName()
5321: renderFilePreview()
5341: renderPdfToCanvas()
5368: viewDoc()
5389: **DINHEIRO**
5390: parseMoney()
5397: fmtMoney()
5398: fmtDate()
5399: todayISO()
5401: **CONFIGURAÇÕES (Gemini e Google Drive)**
5403: loadConfigStatus()
5408: paintConfig()
5413: fillOwnerVehicleSelect()
5419: saveOwnerVehicle()
5441: locadorMerged()
5454: getLocadoresList()
5474: locadorForVehicle()
5483: fillLocadorSettings()
5503: cfgOnLocadorChange()
5504: upsertLocadorInList()
5534: deleteLocadorSetting()
5550: saveLocadorSettings()
5578: openSettings()
5595: fillWhatsLocadora()
5603: salvarWhatsLocadora()
5614: closeSettings()
5615: saveConfig()
5625: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5626: renderAsaasDrivers()
5653: toggleDriverAsaas()
5685: getAtrasoCfg()
5689: fillAtrasoCfg()
5696: saveAtrasoCfg()
5713: atrasoDataBR()
5718: atrasoPrazoUtil()
5725: calcEncargosAtraso()
5744: ehLinhaEncargo()
5745: calcAtrasoMotorista()
5775: atualizarPixAtraso()
5788: loadAsaasInfo()
5802: saveAsaas()
5810: testarAsaas()
5817: copiarAsaas()
5821: testDrive()
5828: resyncDrive()
5836: **FICHA DO MOTORISTA**
5839: openDriverFile()
5871: closeDriverFile()
5873: saveDriverFile()
5940: aiFillDriver()
5979: **CONTROLE FINANCEIRO**
5980: finRange()
5997: dayBR()
5998: inRange()
6000: onFinPeriodChange()
6006: fillFinFilters()
6014: clearFinFilters()
6018: updateFinFilterCount()
6027: openFinance()
6033: switchFinTab()
6044: finCardBtn()
6052: closeFinCardDetail()
6053: closeFinance()
6055: collectRentFinData()
6106: renderFinance()
6164: openFinCardDetail()
6371: openFinExtrato()
6465: renderFinExtratoView()
6546: openFinExtratoReport()
6563: renderFinGrafico()
6583: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6585: okEmail()
6587: openEmailCompose()
6608: closeEmailCompose()
6609: sendEmailCompose()
6624: emailRecibo()
6629: emailIA()
6637: **RELATÓRIO DO FINANCEIRO**
6639: finFiltersText()
6644: finPeriodText()
6651: buildReportHtml()
6673: openFinReport()
6683: closeFinReport()
6684: printFinReport()
6688: shareFinReport()
6698: emailFinReport()
6704: **DESPESAS DO VEÍCULO**
6706: openExpenses()
6718: closeExpenses()
6719: fillExpenseTypes()
6724: createExpenseType()
6739: aiReadExpense()
6771: renderExpenses()
6793: saveExpense()
6820: deleteExpense()
6849: inspSlotLabel()
6852: normalizeInspDbSlot()
6855: photoDamageBadge()
6864: buildVehicleInspectionReport()
6901: copyVehicleInspectionText()
6909: photoCard()
6951: inspectionHtml()
7031: hydrateImages()
7037: openInspection()
7045: closeInspection()
7049: renderInspectionModal()
7056: uploadInspection()
7113: deleteInspectionPhoto()
7133: fmtDue()
7139: nextDueLocal()
7150: openNewPix()
7180: **CAUÇÃO DO MOTORISTA**
7181: cauOf()
7182: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
7183: devOf()
7184: devCobrancas()
7186: devPrevisao()
7194: dfDevRender()
7221: dfDevIr()
7222: dfDevSalvar()
7227: dfDevAvisar()
7233: dfDevDesfazer()
7237: dfDevReceber()
7246: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7250: cauPlano()
7258: cauParcela()
7265: cauParcelasTexto()
7269: cauNext()
7276: dfCauFill()
7286: dfCauCalc()
7314: dfCauRead()
7327: expTypeName()
7331: driverFinVehicleId()
7343: cauEntradaItem()
7357: cauPagoDespesaItem()
7372: **CAUÇÃO: quanto já foi pago**
7374: cauStatus()
7384: obsResumoHtml()
7385: cauResumoHtml()
7390: **MULTAS E OUTRAS DESPESAS**
7391: multasOf()
7393: multaPagaAuto()
7398: multasAbertas()
7399: multasPendentes()
7400: multasResumoHtml()
7408: cobOf()
7409: dfCobFill()
7415: dfCobRead()
7418: dfCobInfo()
7428: cobResumoHtml()
7432: ajustesOf()
7436: ajusteVale()
7437: isoDia()
7439: vencProxima()
7440: previsaoProxima()
7454: previsaoHtml()
7458: dfAjRender()
7464: addAjuste()
7473: delAjuste()
7478: abrirAjustes()
7479: renderProxCobrancas()
7485: savePixExtra()
7493: dfMultFill()
7501: fdPaga()
7502: dfMultRender()
7511: toggleMultas()
7518: addMulta()
7528: delMulta()
7536: multaPaga()
7545: renderDriverExtras()
7573: mondayAfter()
7581: renderDriverProfileExtras()
7647: semanaDoPix()
7653: **MEUS RECIBOS (área do motorista)**
7655: meusRecibosLista()
7659: reciboRowHtml()
7667: renderEncerradoRecibos()
7672: openMeuReciboDireto()
7676: abrirAvisoDev()
7682: fecharAvisoDev()
7683: avisoDevTexto()
7690: enviarAvisoDev()
7710: openMeusRecibos()
7717: closeMeusRecibos()
7718: reciboPdfHtml()
7729: verMeuRecibo()
7736: voltarMeusRecibos()
7737: pdfMeuRecibo()
7741: shareMeuRecibo()
7750: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7751: editVehicleRent()
7768: nextParcel()
7774: fillNewPixValues()
7810: newPixParts()
7841: **PERÍODO E VENCIMENTO DA COBRANÇA**
7842: dataISO()
7843: dataDe()
7844: dataMais()
7845: dataBR()
7846: diasEntre()
7847: isoSP()
7848: pixPeriodo()
7855: pixDesc()
7856: pixDiasPeriodo()
7861: marcarAjustesPorVenc()
7866: pixDatasNovo()
7875: pixDatasMudou()
7886: pixAluguelProporcional()
7894: pixPeriodoInfo()
7907: pixAddLinha()
7914: pixLinhas()
7916: descSoma()
7926: calcNewPix()
7935: **RECIBO DE PAGAMENTO**
7939: receiptValue()
7940: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7941: atrasoDados()
7945: cobrarAtraso()
7962: allocatePix()
7981: reciboData()
8004: fmtDateTimeBR()
8005: reciboTexto()
8056: openRecibo()
8073: closeRecibo()
8074: **CORRIGIR RECIBO**
8076: corrigirLinhaHtml()
8086: openCorrigirRecibo()
8109: closeCorrigirRecibo()
8110: corrigirLer()
8116: corrigirSoma()
8123: salvarCorrigirRecibo()
8140: copyRecibo()
8145: reciboCanvas()
8162: reciboPdfBlob()
8180: shareReciboPdf()
8196: rotularTabelas()
8214: areaAberta()
8215: markAreas()
8225: closeAreas()
8229: toggleArea()
8237: dobraSalva()
8238: setDobra()
8243: toggleDobra()
8250: dobraTopo()
8257: renderMasterResumo()
8271: renderMasterTopo()
8293: loadIA()
8315: updateIABadge()
8320: loadIASetting()
8326: paintIASwitch()
8332: toggleIA()
8339: loadRobo()
8348: iaPrepararQr()
8353: paintRobo()
8382: pedirCodigoRobo()
8391: toggleRobo()
8406: iaTodosGerar()
8424: iaTodosCancelar()
8428: iaTodosConfirmar()
8442: loadIARules()
8447: iaAbrirPdf()
8453: renderIARules()
8457: saveIARules()
8462: addIARule()
8467: delIARule()
8471: openIA()
8486: closeIA()
8487: iaShow()
8488: iaPhone()
8493: renderIA()
8535: iaAprovar()
8544: iaPhone2()
8545: iaSend()
8576: iaMark()
8587: iaDelete()
8598: openPixArea()
8607: closePixArea()
8608: renderPixArea()
8652: openEditPix()
8681: deletePix()
8693: closeNewPix()
8695: saveNewPix()
8786: pushSupported()
8787: isIOS()
8788: isStandalone()
8789: b64ToBytes()
8795: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8800: notifStatus()
8808: stepsList()
8812: notifHelpHtml()
8846: renderNotifModal()
8858: checkDriverNotifications()
8891: activateFromModal()
8904: refreshNotifButton()
8923: subscribePush()
8938: enableNotifications()
8958: closeDocViewer()
8966: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8978: allFeaturesOn()
8979: feat()
8980: loadDriverFeatures()
8987: saveDriverFeatures()
8992: drawFeatureToggles()
9007: setAllFeatures()
9018: applyDriverFeatures()
9033: **PIX: conferência do código e QR code desenhado no aparelho**
9034: crc16()
9042: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
9044: pixTxt()
9045: pixCampo()
9046: pixGerarCodigo()
9056: pixAutoLigado()
9057: pixAutoMudou()
9062: gerarPixAuto()
9078: pixRecebedorCarregar()
9089: pixRecebedorGuardar()
9096: pixValid()
9102: renderPixQr()
9112: previewNewPixQr()
9122: **FOTO DO MOTORISTA (recortada da CNH)**
9123: photoPath()
9124: fileToCanvas()
9143: cropPhoto()
9157: savePhoto()
9162: photoBoxFrom()
9168: fillAvatar()
9179: fillAvatars()
9192: storedFile()
9199: photoFromCnh()
9211: **FOTO DO PERFIL ACOMPANHA A CNH**
9214: cnhStamp()
9215: photoFiles()
9223: avatarPath()
9228: syncCnhPhotos()
9252: pickImage()
9255: changeDriverPhoto()
9271: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9273: uploadTmp()
9280: clearTmp()
9285: aiReadFiles()
9291: okDateISO()
9293: noAccents()
9295: makeUsername()
9304: titleCase()
9305: syncNewDriverAccess()
9311: setNewDriverPhoto()
9316: pickNewDriverPhoto()
9320: resetNewDriverForm()
9328: newDriverDocChosen()
9362: anoCrlv()
9366: formatVehicleBrand()
9371: inferVehicleBrand()
9380: normalizeCrlvFields()
9399: applyCrlvFields()
9412: aiReadCrlv()
9426: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9427: sendWelcomeEmail()
9433: showCredentials()
9444: demoAssistente()
9463: **PERGUNTAR À IA (ÁREA IA, só o master)**
9467: iaChatReset()
9468: iaNorm()
9469: iaAcha()
9475: iaVeicTxt()
9476: iaCamposVeic()
9477: iaDataOk()
9478: iaOpcoes()
9479: iaTodosMotoristas()
9483: iaFerramenta()
9578: renderIAChat()
9595: iaChatDica()
9596: iaChatEnviar()
9631: iaChatNota()
9632: iaCancelarCartao()
9633: iaConfirmarCartao()
9678: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9679: syncAppFinState()
9688: renderAppEarnings()
9768: saveAppEarning()
9795: workDayISO()
9796: paintDayOff()
9805: renderDayOff()
9812: setDayOff()
9822: aiReadEarning()
9855: **DESPESAS DO APLICATIVO**
9857: appExpCustomTypes()
9858: fillAppExpTypes()
9865: onAppExpTypeChange()
9870: saveAppExpense()
9895: deleteAppExpense()
9904: deleteAppEarning()
10001: loadTermsAcceptances()
10013: termsOf()
10014: currentAcceptance()
10015: needsTermsAcceptance()
10018: fmtDateTime()
10021: termsPlainText()
10025: termsHash()
10033: openTermsGate()
10056: termsGateCheck()
10064: acceptTerms()
10084: acceptanceHtml()
10095: openTermsViewer()
10113: closeTerms()
10119: downloadTermsCopy()
10140: termsBadgeMaster()
10147: termsMasterDetail()
10188: renderTermsSetupBanner()
10201: copyTermsSql()
10211: cnhExpired()
10212: cnhWaiting()
10213: onlyDigits()
10214: normName()
10216: verifyCnh()
10228: renderCnhBanner()
10246: sendNewCnh()
10294: cnhBadgeMaster()
10302: applyPendingCnh()
10310: autoReadNewCnhs()
10328: cnhPendingHtml()
10342: recheckPendingCnh()
10352: rejectPendingCnh()
10362: showContractDoc()
10480: inspectPdfSignaturesBytes()
10499: readPdfFileAsBase64AndInspect()
10514: govBrSignersList()
10526: renderGovBrFlowBox()
10578: driverGovBrBlockHtml()
10607: govBrPublicAppBaseUrl()
10611: createGovBrInvite()
10643: submitMasterGovBrPdf()
10664: submitDriverGovBrPdf()
10683: loadGovBrInvitePage()
10754: submitGovBrInvitePdf()
10773: exitGovBrInviteToLogin()
10792: contractPeriodLabel()
10793: contractStatusBadge()
10797: pdfSafeText()
10809: contractPdfFileName()
10818: cwBuildDepositChargeText()
10860: cwBuildDepositClauseText()
10872: lcClauseStart()
10879: buildDefaultClauses()
10950: generateContractPdfBytes()
10969: drawHeader()
10974: newPage()
10981: ensureSpace()
10984: wrapLines()
11008: drawJustifiedLine()
11274: renderContractsTab()
11328: renderDriverRentalContractsBox()
11387: openContractForDriver()
11394: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11396: closeContractWizard()
11397: cwPopulateSelects()
11405: cwPopulateLocadores()
11417: cwOnLocadorChange()
11426: defaultWitness1ForLocador()
11434: cwApplyDefaultWitness1()
11447: cwFillLocador()
11456: cwFillDepositFromDriver()
11484: cwFillDepositFromComercial()
11506: cwSyncClauseIdx()
11515: cwSyncDepositClauseOnly()
11516: cwUpdateTrialPreview()
11532: cwDepCalc()
11577: cwApplyDriverContractDefaults()
11594: cwFillDriver()
11613: cwUpdateCrlvBar()
11622: cwNeedsCrlvFill()
11626: cwRefreshMissingBoxIfVisible()
11635: cwReadVehicleCrlv()
11684: cwReadCurrentVehicleCrlv()
11690: cwFillVehicle()
11712: cwOnDriverChange()
11728: cwOnVehicleChange()
11741: cwDefaultChecklist()
11746: cwToggleVistoriaFields()
11751: cwRenderInspChecklist()
11770: cwRenderInspDamagesSummary()
11784: cwRenderInspPhotos()
11821: cwUpdateInspPhotoDamage()
11829: cwSyncVistoriaFromVehicle()
11846: cwImportSavedPhotos()
11862: cwUploadInspPhotos()
11902: cwAnalyzeInspWithAI()
11911: cwReadSnapshot()
11970: cwRenderClausesEditor()
11980: cwRebuildClauses()
11988: cwRenderPreview()
12043: cwTogglePreview()
12048: validateContractForEmission()
12065: openContractWizard()
12200: cwSyncSources()
12255: logContractHistory()
12264: persistContract()
12355: saveContractDraft()
12356: emitContract()
12358: ensureContractPdfBlob()
12369: downloadContractPdf()
12381: printContractPdf()
12394: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12395: closeContractDetail()
12396: openContractDetail()
12469: saveContractSignatures()
12496: uploadSignedContractFile()
12518: terminateContractPrompt()
12533: clearDriverPathsIfMatching()
12543: cancelContractPrompt()
12559: deleteContractPrompt()
12613: inspectionTypeBadge()
12617: inspectionStatusBadge()
12621: inspectionPdfFileName()
12628: switchContractsSubtab()
12641: renderInspectionsTab()
12701: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12702: runInspectionBatchAI()
12725: promptInspectionDamageConfirmation()
12803: processInspectionPhotosWithAI()
12859: analyzeSavedInspectionPhotos()
12875: renameInspectionPhoto()
12891: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12894: closeInspectionWizard()
12895: openInspectionWizard()
12959: iwCollectSavedPhotosFor()
12992: iwPopulateContractsAndBase()
13015: iwSyncHeaderAndLegal()
13027: iwOnTypeChange()
13033: iwOnVehicleChange()
13051: iwOnDriverChange()
13056: iwOnContractChange()
13063: iwImportSavedPhotos()
13074: iwUploadPhotos()
13127: iwResolveEntregaBaseline()
13148: iwRunAIOnList()
13174: iwAnalyzeWithAI()
13181: iwRenderPhotos()
13220: iwUpdatePhotoField()
13225: iwUpdatePhotoDamage()
13233: iwRemovePhoto()
13239: iwRenderDamagesSummary()
13254: iwRenderComparison()
13273: iwRenderChecklist()
13292: persistInspectionTerm()
13395: saveInspectionDraft()
13396: emitInspectionTerm()
13398: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13399: blobToEmbeddableJpeg()
13429: embedBlobIntoPdf()
13442: generateInspectionPdfBytes()
13642: ensureInspectionPdfBlob()
13652: downloadInspectionPdf()
13664: printInspectionPdf()
13677: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13678: closeInspectionDetail()
13679: openInspectionDetail()
13739: saveInspectionSignatures()
13765: uploadSignedInspectionFile()
13787: cancelInspectionPrompt()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/ar-aviso/index.ts (84 linhas)

11: json()
12: secret()
14: mandar()
32: ceuMetar()

## supabase/functions/ar-caes/index.ts (84 linhas)

11: json()
12: secret()
15: limpar()
17: configurar()
23: enviar()

## supabase/functions/ar-siri/index.ts (28 linhas)

6: texto()

## supabase/functions/motora-asaas/index.ts (656 linhas)

22: serviceKey()
29: json()
31: brl()
32: r2()
36: secret()
41: asaas()
54: avisar()
64: hojeBR()
65: proximoDia()
72: proximaParcela()
83: cauParcela()
92: ajusteVale()
95: tirarAjustes()
103: getAtrasoConfig()
107: atrasoDataBR()
112: atrasoPrazoUtil()
119: calcEncargosAtraso()
137: ehLinhaEncargo()
139: cobrarMotorista()
152: *valores (mesma regra do Novo Pix)*
180: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
183: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
204: criarQrAsaasEUpload()
227: saldoAbertoMotorista()
287: salvarQrParcialNoPerfil()
298: atualizarQrAtrasoMotorista()
332: cobrarTodos()
363: *pagamento recebido*
364: quemPagou()
387: pagamentoRecebido()
477: usuarioAuth()
486: ehMaster()
491: pixParcialMotorista()
550: autorizarParcial()
591: preparar()
592: limpa()
627: acao "pix_parcial"
630: acao "autorizar_parcial"
635: acao "preparar"
638: acao "atualizar_atraso"
649: acao "cobrar"

## supabase/functions/motora-assinatura/index.ts (542 linhas)

7: serviceKey()
27: json()
47: maskCpf()
53: inspectPdfSignatures()
77: makeToken()
84: resolveDoc()
92: publicDocSummary()
129: authUser()

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (367 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
124: r2()
125: atrasoDataBR()
130: atrasoPrazoUtil()
137: calcEncargosAtraso()
155: ehLinhaEncargo()
158: emAberto()
181: avisoAtraso()
204: **4) PIX AUTOMÁTICO DO MOTORA**
206: crc16()
211: campo()
212: txtPix()
213: codigoPix()
220: chaveNormal()
227: proximaParcela()
235: pixAutomatico()
242: *valores (mesma regra do Novo Pix e do Asaas)*
269: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
290: pixAutoTodos()
314: enviar()
323: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (443 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## supabase/functions/motora-sync/index.ts (573 linhas)

5: serviceKey()
17: json()
19: secret()
24: readFile()
33: drive()
42: stamp()
44: driverInfo()
50: syncDoc()
58: uploadReceipt()
66: syncPix()
78: syncExpense()
91: *DOCUMENTOS DO VEÍCULO, VISTORIA E TERMOS (envio automático ao Drive)*
92: vehicleInfo()
98: syncVehicleDoc()
105: syncInspection()
113: escHtml()
114: syncTerms()
129: *fim*
131: *E-MAIL: a IA escreve, o dono confere no app e confirma o envio*
132: regrasDono()
137: emailDraft()
155: sendEmail()
163: *fim do e-mail*
165: **LEITURA DE DOCUMENTOS E VISTORIA COM IA (Gemini)**
168: modelosGemini()
184: callGemini()
238: expensePrompt()
246: earningPrompt()
258: callGeminiDriver()
260: aiReadFiles()
273: aiAnalyzeInspection()
314: driverWelcome()
329: *CONFERÊNCIA DE COMPROVANTE COM IA*
336: geminiOnFiles()
346: nameWords()
350: brl()
351: dBR()
353: pushAlert()
362: notifyMasters()
363: notifyDriver()
365: verifyReceipt()
372: save()
421: checkDriverCnh()
436: dig()
457: driverCnhCheck()
467: dig()
492: aiRead()
514: type "doc"
515: type "receipt"
516: type "pix"
517: type "expense"
518: type "vehicle_doc"
519: type "inspection"
520: type "terms"
521: type "verify_receipt"
522: type "driver_cnh"
531: type "driver_cnh_check"
534: type "ai_read"
535: type "verify_receipt"
536: type "ai_read_files"
541: type "ai_analyze_inspection"
546: type "driver_welcome"
547: type "email_draft"
548: type "send_email"
550: type "drive_ping"
551: type "drive_resync"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-atraso-juros-asaas.sql: MOTORA — 12/11/2026: Juros e multa por inadimplência alinhados ao Asaas (10% multa + 2% ao mês pro rata die, QR estático sem tarifa)
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
- supabase/2026-11-12-modulo-contratos.sql: Módulo de Contratos de Locação (12/11/2026)
- supabase/2026-11-12-modulo-vistorias.sql: Módulo Unificado de Vistorias Veiculares e Devolução com IA (12/11/2026)
- supabase/2026-11-13-govbr-assinaturas.sql: Fluxo oficial de assinaturas eletrônicas via Portal GOV.BR (assinador.iti.br)
- supabase/2026-11-14-ar-acorda.sql: Nossa casinha (14/11/2026, placa versão 9): comando na hora. Cada comando novo em ar.cmd manda um "cutucão" pelo
- supabase/2026-11-14-ar-aviso.sql: Nossa casinha: notificação ao dono quando o ar liga ou desliga sem ele ter pedido (14/11/2026).
- supabase/2026-11-14-ar-evento.sql: Nossa casinha (14/11/2026): o bloco do ar mostra quem ligou/desligou e a que horas ("Desligado pelo automático às 18:20").
- supabase/2026-11-14-ar-historico.sql: Nossa casinha (14/11/2026): histórico para "Uso do ar" (horas ligado por dia), "24 h" (temperatura a cada 5 min com o
- supabase/2026-11-14-ar-push.sql: Nossa casinha: avisos no celular pelo próprio app (14/11/2026). Antes os avisos do ar iam como "master_alert" do
- supabase/2026-11-14-ar-siri.sql: Siri do "Nossa casinha": atalho do iPhone manda a frase para a função ar-siri, que usa uma chave só do dono.
- supabase/2026-11-14-ar-temp-dia.sql: Nossa casinha: máxima e mínima do quarto por dia (14/11/2026), para o gráfico "Temperatura máxima · últimos 7 dias".
- supabase/2026-11-15-ar-caes.sql: Nossa casinha: avisos de fome e sede dos cachorros Elvis, Belinha e Maya (15/11/2026).
- supabase/2026-11-15-ar-fora-real.sql: Nossa casinha: temperatura de lá fora MEDIDA, não prevista (15/11/2026, pedido do dono).
- supabase/2026-11-15-ar-janela.sql: Nossa casinha: lá fora mais frio = abrir a janela (15/11/2026, pedido do dono; placa versão 20).
- supabase/2026-11-23-ar-claudinho.sql: Nossa casinha (23/11/2026): comandos diretos (texto e áudio) do app para o Claudinho (J7) pela nuvem.
- supabase/2026-11-25-atraso-madrugada.sql: PIX DE ATRASO LOGO DEPOIS DA MEIA-NOITE (25/11/2026; já aplicado no Supabase)
- supabase/2026-11-25-aviso-devolucao.sql: AVISO DE DEVOLUÇÃO PELO MOTORISTA (25/11/2026, pedido do dono). Já aplicado no Supabase.
- supabase/2026-11-25-mudar-dia-pagamento.sql: MUDAR DIA DO PAGAMENTO e levar junto a cobrança em aberto (25/11/2026, pedido do dono; caso da Argelia)
- supabase/2026-11-25-whatsapp-locadora.sql: WHATSAPP DA LOCADORA (25/11/2026, pedido do dono). Já aplicado no Supabase.
