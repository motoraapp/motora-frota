# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 25/11/2026, 21:35:42. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13844 linhas)

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
2793: demoClient()
2996: demoStart()
3004: demoStop()
3010: abrirDemo()
3017: trocarDemo()
3022: demoBanner()
3037: toEmail()
3041: showLogin()
3045: esc()
3050: toBRTInput()
3063: parseBRTInputToIso()
3072: dataHoraBR()
3086: uiDialogo()
3134: uiConfirm()
3143: uiPrompt()
3149: friendlyError()
3159: unwrapInvokeResult()
3179: devicePrefs()
3182: saveDevicePrefs()
3185: docRef()
3186: viewDocIdx()
3188: setBusy()
3231: **TEMAS**
3240: currentTheme()
3245: applyTheme()
3246: openThemes()
3256: pickTheme()
3262: toggleDarkMode()
3264: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3266: loadDesignCfg()
3273: applyDesign()
3290: markMasterNav()
3297: fillDesignCfg()
3302: saveDesign()
3316: showToast()
3325: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3326: senhaErro()
3327: abrirSenha()
3336: salvarIaCodigo()
3346: fecharSenha()
3347: salvarSenha()
3368: loginUserInput()
3373: loginErro()
3377: verSenha()
3382: handleLogin()
3431: logout()
3450: saveFirstLoginPreferences()
3473: carregarDados()
3505: aplicarDados()
3546: loadAndRender()
3573: autoRefresh()
3612: markUpdated()
3617: reload()
3622: renderApp()
3670: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3673: masterBack()
3675: viewAsDriver()
3697: exitViewAs()
3716: viewOnly()
3717: renderViewAsBanner()
3727: showSection()
3732: withBtn()
3740: toggleDriverStatus()
3749: isOnline()
3751: updateStatusToggleUI()
3764: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3773: checkApkUpdate()
3788: updateInstallApkButton()
3808: renderDriverPanel()
4067: switchDriverTab()
4082: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
4085: parsePixKey()
4089: normalizePixKey()
4097: pixKeyLooksOk()
4105: togglePixKeyFields()
4111: updatePixKeyPlaceholder()
4117: copyPixKey()
4124: copyPixCode()
4136: receiptBadge()
4146: receiptMasterBox()
4173: receiptAction()
4180: confirmReceipt()
4209: rejectReceipt()
4221: recheckReceipt()
4230: uploadReceipt()
4253: switchMasterTab()
4272: maskPhone()
4281: waLink()
4286: allVeh()
4287: allDrv()
4288: chargeVehicleId()
4300: enviarPedidoParcialAsaas()
4316: pedirPixParcial()
4334: restaurarPixTotal()
4340: responderPixParcial()
4364: contrato30Info()
4394: encerrarContrato()
4411: encerrarContratoPrompt()
4424: reativarContrato()
4448: marcarCaucaoPagoArquivar()
4469: desarquivarFicha()
4487: deliveryInspectionHtml()
4526: uploadDeliveryPhotos()
4553: delDeliveryPhoto()
4571: addCauDesconto()
4596: puxarMultaCaucao()
4617: delCauDesconto()
4639: dfCauDescontosHtml()
4672: dfContratoRender()
4716: encerrarContratoConfirmFicha()
4723: renderMasterPanel()
4889: renderArchivedDrivers()
4934: handleAddVehicle()
4974: deleteVehicle()
4975: cancelDeleteVehicle()
4977: confirmDeleteVehicle()
5001: abrirEditarVeiculo()
5023: evReadStoredCrlv()
5048: evReadChosenCrlv()
5064: fecharEditarVeiculo()
5065: salvarEditarVeiculo()
5102: drvCauMostra()
5109: drvCauLer()
5117: handleAddDriver()
5195: marcarSituacao()
5205: updateDriverPaymentStatus()
5216: cobrancaAberta()
5220: proximoDiaISO()
5221: mudarDiaPagamento()
5234: tirarEncargos()
5255: aplicarDiaPagamento()
5285: deleteDriver()
5286: cancelDeleteDriver()
5288: confirmDeleteDriver()
5310: isImageFile()
5312: prepareFile()
5334: uploadFile()
5345: fileUrl()
5356: downloadName()
5360: renderFilePreview()
5380: renderPdfToCanvas()
5407: viewDoc()
5428: **DINHEIRO**
5429: parseMoney()
5436: fmtMoney()
5437: fmtDate()
5438: todayISO()
5440: **CONFIGURAÇÕES (Gemini e Google Drive)**
5442: loadConfigStatus()
5447: paintConfig()
5452: fillOwnerVehicleSelect()
5458: saveOwnerVehicle()
5480: locadorMerged()
5493: getLocadoresList()
5513: locadorForVehicle()
5522: fillLocadorSettings()
5542: cfgOnLocadorChange()
5543: upsertLocadorInList()
5573: deleteLocadorSetting()
5589: saveLocadorSettings()
5617: openSettings()
5634: fillWhatsLocadora()
5642: salvarWhatsLocadora()
5653: closeSettings()
5654: saveConfig()
5664: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5665: renderAsaasDrivers()
5692: toggleDriverAsaas()
5724: getAtrasoCfg()
5728: fillAtrasoCfg()
5735: saveAtrasoCfg()
5752: atrasoDataBR()
5757: atrasoPrazoUtil()
5764: calcEncargosAtraso()
5783: ehLinhaEncargo()
5784: calcAtrasoMotorista()
5814: atualizarPixAtraso()
5827: loadAsaasInfo()
5841: saveAsaas()
5849: testarAsaas()
5856: copiarAsaas()
5860: testDrive()
5867: resyncDrive()
5875: **FICHA DO MOTORISTA**
5878: openDriverFile()
5910: closeDriverFile()
5912: saveDriverFile()
5979: aiFillDriver()
6018: **CONTROLE FINANCEIRO**
6019: finRange()
6036: dayBR()
6037: inRange()
6039: onFinPeriodChange()
6045: fillFinFilters()
6053: clearFinFilters()
6057: updateFinFilterCount()
6066: openFinance()
6072: switchFinTab()
6083: finCardBtn()
6091: closeFinCardDetail()
6092: closeFinance()
6094: collectRentFinData()
6145: renderFinance()
6203: openFinCardDetail()
6410: openFinExtrato()
6504: renderFinExtratoView()
6585: openFinExtratoReport()
6602: renderFinGrafico()
6622: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6624: okEmail()
6626: openEmailCompose()
6647: closeEmailCompose()
6648: sendEmailCompose()
6663: emailRecibo()
6668: emailIA()
6676: **RELATÓRIO DO FINANCEIRO**
6678: finFiltersText()
6683: finPeriodText()
6690: buildReportHtml()
6712: openFinReport()
6722: closeFinReport()
6723: printFinReport()
6727: shareFinReport()
6737: emailFinReport()
6743: **DESPESAS DO VEÍCULO**
6745: openExpenses()
6757: closeExpenses()
6758: fillExpenseTypes()
6763: createExpenseType()
6778: aiReadExpense()
6810: renderExpenses()
6832: saveExpense()
6859: deleteExpense()
6888: inspSlotLabel()
6891: normalizeInspDbSlot()
6894: photoDamageBadge()
6903: buildVehicleInspectionReport()
6940: copyVehicleInspectionText()
6948: photoCard()
6990: inspectionHtml()
7070: hydrateImages()
7076: openInspection()
7084: closeInspection()
7088: renderInspectionModal()
7095: uploadInspection()
7152: deleteInspectionPhoto()
7172: fmtDue()
7178: nextDueLocal()
7189: openNewPix()
7219: **CAUÇÃO DO MOTORISTA**
7220: cauOf()
7221: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
7222: devOf()
7223: devCobrancas()
7225: devPrevisao()
7233: dfDevRender()
7260: dfDevIr()
7261: dfDevSalvar()
7266: dfDevAvisar()
7272: dfDevDesfazer()
7276: dfDevReceber()
7285: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7289: cauPlano()
7297: cauParcela()
7304: cauParcelasTexto()
7308: cauNext()
7315: dfCauFill()
7325: dfCauCalc()
7353: dfCauRead()
7366: expTypeName()
7370: driverFinVehicleId()
7382: cauEntradaItem()
7396: cauPagoDespesaItem()
7411: **CAUÇÃO: quanto já foi pago**
7413: cauStatus()
7423: obsResumoHtml()
7424: cauResumoHtml()
7429: **MULTAS E OUTRAS DESPESAS**
7430: multasOf()
7432: multaPagaAuto()
7437: multasAbertas()
7438: multasPendentes()
7439: multasResumoHtml()
7447: cobOf()
7448: dfCobFill()
7454: dfCobRead()
7457: dfCobInfo()
7467: cobResumoHtml()
7471: ajustesOf()
7475: ajusteVale()
7476: isoDia()
7478: vencProxima()
7479: previsaoProxima()
7493: previsaoHtml()
7497: dfAjRender()
7503: addAjuste()
7512: delAjuste()
7517: abrirAjustes()
7518: renderProxCobrancas()
7524: savePixExtra()
7532: dfMultFill()
7540: fdPaga()
7541: dfMultRender()
7550: toggleMultas()
7557: addMulta()
7567: delMulta()
7575: multaPaga()
7584: renderDriverExtras()
7612: mondayAfter()
7620: renderDriverProfileExtras()
7686: semanaDoPix()
7692: **MEUS RECIBOS (área do motorista)**
7694: meusRecibosLista()
7698: reciboRowHtml()
7706: renderEncerradoRecibos()
7711: openMeuReciboDireto()
7715: abrirAvisoDev()
7721: fecharAvisoDev()
7722: avisoDevTexto()
7729: enviarAvisoDev()
7749: openMeusRecibos()
7756: closeMeusRecibos()
7757: reciboPdfHtml()
7768: verMeuRecibo()
7775: voltarMeusRecibos()
7776: pdfMeuRecibo()
7780: shareMeuRecibo()
7789: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7790: editVehicleRent()
7807: nextParcel()
7813: fillNewPixValues()
7849: newPixParts()
7880: **PERÍODO E VENCIMENTO DA COBRANÇA**
7881: dataISO()
7882: dataDe()
7883: dataMais()
7884: dataBR()
7885: diasEntre()
7886: isoSP()
7887: pixPeriodo()
7894: pixDesc()
7895: pixDiasPeriodo()
7900: marcarAjustesPorVenc()
7905: pixDatasNovo()
7914: pixDatasMudou()
7925: pixAluguelProporcional()
7933: pixPeriodoInfo()
7946: pixAddLinha()
7953: pixLinhas()
7955: descSoma()
7965: calcNewPix()
7974: **RECIBO DE PAGAMENTO**
7978: receiptValue()
7979: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7980: atrasoDados()
7984: cobrarAtraso()
8001: allocatePix()
8020: reciboData()
8043: fmtDateTimeBR()
8044: reciboTexto()
8095: openRecibo()
8112: closeRecibo()
8113: **CORRIGIR RECIBO**
8115: corrigirLinhaHtml()
8125: openCorrigirRecibo()
8148: closeCorrigirRecibo()
8149: corrigirLer()
8155: corrigirSoma()
8162: salvarCorrigirRecibo()
8179: copyRecibo()
8184: reciboCanvas()
8201: reciboPdfBlob()
8219: shareReciboPdf()
8235: rotularTabelas()
8253: areaAberta()
8254: markAreas()
8264: closeAreas()
8268: toggleArea()
8276: dobraSalva()
8277: setDobra()
8282: toggleDobra()
8289: dobraTopo()
8296: renderMasterResumo()
8310: renderMasterTopo()
8332: loadIA()
8354: updateIABadge()
8359: loadIASetting()
8365: paintIASwitch()
8371: toggleIA()
8378: loadRobo()
8387: iaPrepararQr()
8392: paintRobo()
8421: pedirCodigoRobo()
8430: toggleRobo()
8445: iaTodosGerar()
8463: iaTodosCancelar()
8467: iaTodosConfirmar()
8481: loadIARules()
8486: iaAbrirPdf()
8492: renderIARules()
8496: saveIARules()
8501: addIARule()
8506: delIARule()
8510: openIA()
8525: closeIA()
8526: iaShow()
8527: iaPhone()
8532: renderIA()
8574: iaAprovar()
8583: iaPhone2()
8584: iaSend()
8615: iaMark()
8626: iaDelete()
8637: openPixArea()
8646: closePixArea()
8647: renderPixArea()
8692: openEditPix()
8721: deletePix()
8733: closeNewPix()
8735: saveNewPix()
8826: pushSupported()
8827: isIOS()
8828: isStandalone()
8829: b64ToBytes()
8835: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8840: notifStatus()
8848: stepsList()
8852: notifHelpHtml()
8886: renderNotifModal()
8898: checkDriverNotifications()
8931: activateFromModal()
8944: refreshNotifButton()
8963: subscribePush()
8978: enableNotifications()
8998: closeDocViewer()
9006: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
9018: allFeaturesOn()
9019: feat()
9020: loadDriverFeatures()
9027: saveDriverFeatures()
9032: drawFeatureToggles()
9047: setAllFeatures()
9058: applyDriverFeatures()
9073: **PIX: conferência do código e QR code desenhado no aparelho**
9074: crc16()
9082: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
9084: pixTxt()
9085: pixCampo()
9086: pixGerarCodigo()
9096: pixAutoLigado()
9097: pixAutoMudou()
9102: gerarPixAuto()
9118: pixRecebedorCarregar()
9129: pixRecebedorGuardar()
9136: pixValid()
9142: renderPixQr()
9152: previewNewPixQr()
9162: **FOTO DO MOTORISTA (recortada da CNH)**
9163: photoPath()
9164: fileToCanvas()
9183: cropPhoto()
9197: savePhoto()
9202: photoBoxFrom()
9208: fillAvatar()
9219: fillAvatars()
9232: storedFile()
9239: photoFromCnh()
9251: **FOTO DO PERFIL ACOMPANHA A CNH**
9254: cnhStamp()
9255: photoFiles()
9263: avatarPath()
9268: syncCnhPhotos()
9292: pickImage()
9295: changeDriverPhoto()
9311: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9313: uploadTmp()
9320: clearTmp()
9325: aiReadFiles()
9331: okDateISO()
9333: noAccents()
9335: makeUsername()
9344: titleCase()
9345: syncNewDriverAccess()
9351: setNewDriverPhoto()
9356: pickNewDriverPhoto()
9360: resetNewDriverForm()
9368: newDriverDocChosen()
9402: anoCrlv()
9406: formatVehicleBrand()
9411: inferVehicleBrand()
9420: normalizeCrlvFields()
9439: applyCrlvFields()
9452: aiReadCrlv()
9466: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9467: sendWelcomeEmail()
9473: showCredentials()
9484: demoAssistente()
9503: **PERGUNTAR À IA (ÁREA IA, só o master)**
9507: iaChatReset()
9508: iaNorm()
9509: iaAcha()
9515: iaVeicTxt()
9516: iaCamposVeic()
9517: iaDataOk()
9518: iaOpcoes()
9519: iaTodosMotoristas()
9523: iaFerramenta()
9618: renderIAChat()
9635: iaChatDica()
9636: iaChatEnviar()
9671: iaChatNota()
9672: iaCancelarCartao()
9673: iaConfirmarCartao()
9718: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9719: syncAppFinState()
9728: renderAppEarnings()
9808: saveAppEarning()
9835: workDayISO()
9836: paintDayOff()
9845: renderDayOff()
9852: setDayOff()
9862: aiReadEarning()
9895: **DESPESAS DO APLICATIVO**
9897: appExpCustomTypes()
9898: fillAppExpTypes()
9905: onAppExpTypeChange()
9910: saveAppExpense()
9935: deleteAppExpense()
9944: deleteAppEarning()
10041: loadTermsAcceptances()
10053: termsOf()
10054: currentAcceptance()
10055: needsTermsAcceptance()
10058: fmtDateTime()
10061: termsPlainText()
10065: termsHash()
10073: openTermsGate()
10096: termsGateCheck()
10104: acceptTerms()
10124: acceptanceHtml()
10135: openTermsViewer()
10153: closeTerms()
10159: downloadTermsCopy()
10180: termsBadgeMaster()
10187: termsMasterDetail()
10228: renderTermsSetupBanner()
10241: copyTermsSql()
10251: cnhExpired()
10252: cnhWaiting()
10253: onlyDigits()
10254: normName()
10256: verifyCnh()
10268: renderCnhBanner()
10286: sendNewCnh()
10334: cnhBadgeMaster()
10342: applyPendingCnh()
10350: autoReadNewCnhs()
10368: cnhPendingHtml()
10382: recheckPendingCnh()
10392: rejectPendingCnh()
10402: showContractDoc()
10520: inspectPdfSignaturesBytes()
10539: readPdfFileAsBase64AndInspect()
10554: govBrSignersList()
10566: renderGovBrFlowBox()
10618: driverGovBrBlockHtml()
10647: govBrPublicAppBaseUrl()
10651: createGovBrInvite()
10683: submitMasterGovBrPdf()
10704: submitDriverGovBrPdf()
10723: loadGovBrInvitePage()
10794: submitGovBrInvitePdf()
10813: exitGovBrInviteToLogin()
10832: contractPeriodLabel()
10833: contractStatusBadge()
10837: pdfSafeText()
10849: contractPdfFileName()
10858: cwBuildDepositChargeText()
10900: cwBuildDepositClauseText()
10912: lcClauseStart()
10919: buildDefaultClauses()
10990: generateContractPdfBytes()
11009: drawHeader()
11014: newPage()
11021: ensureSpace()
11024: wrapLines()
11048: drawJustifiedLine()
11314: renderContractsTab()
11368: renderDriverRentalContractsBox()
11427: openContractForDriver()
11434: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11436: closeContractWizard()
11437: cwPopulateSelects()
11445: cwPopulateLocadores()
11457: cwOnLocadorChange()
11466: defaultWitness1ForLocador()
11474: cwApplyDefaultWitness1()
11487: cwFillLocador()
11496: cwFillDepositFromDriver()
11524: cwFillDepositFromComercial()
11546: cwSyncClauseIdx()
11555: cwSyncDepositClauseOnly()
11556: cwUpdateTrialPreview()
11572: cwDepCalc()
11617: cwApplyDriverContractDefaults()
11634: cwFillDriver()
11653: cwUpdateCrlvBar()
11662: cwNeedsCrlvFill()
11666: cwRefreshMissingBoxIfVisible()
11675: cwReadVehicleCrlv()
11724: cwReadCurrentVehicleCrlv()
11730: cwFillVehicle()
11752: cwOnDriverChange()
11768: cwOnVehicleChange()
11781: cwDefaultChecklist()
11786: cwToggleVistoriaFields()
11791: cwRenderInspChecklist()
11810: cwRenderInspDamagesSummary()
11824: cwRenderInspPhotos()
11861: cwUpdateInspPhotoDamage()
11869: cwSyncVistoriaFromVehicle()
11886: cwImportSavedPhotos()
11902: cwUploadInspPhotos()
11942: cwAnalyzeInspWithAI()
11951: cwReadSnapshot()
12010: cwRenderClausesEditor()
12020: cwRebuildClauses()
12028: cwRenderPreview()
12083: cwTogglePreview()
12088: validateContractForEmission()
12105: openContractWizard()
12240: cwSyncSources()
12295: logContractHistory()
12304: persistContract()
12395: saveContractDraft()
12396: emitContract()
12398: ensureContractPdfBlob()
12409: downloadContractPdf()
12421: printContractPdf()
12434: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12435: closeContractDetail()
12436: openContractDetail()
12509: saveContractSignatures()
12536: uploadSignedContractFile()
12558: terminateContractPrompt()
12573: clearDriverPathsIfMatching()
12583: cancelContractPrompt()
12599: deleteContractPrompt()
12653: inspectionTypeBadge()
12657: inspectionStatusBadge()
12661: inspectionPdfFileName()
12668: switchContractsSubtab()
12681: renderInspectionsTab()
12741: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12742: runInspectionBatchAI()
12765: promptInspectionDamageConfirmation()
12843: processInspectionPhotosWithAI()
12899: analyzeSavedInspectionPhotos()
12915: renameInspectionPhoto()
12931: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12934: closeInspectionWizard()
12935: openInspectionWizard()
12999: iwCollectSavedPhotosFor()
13032: iwPopulateContractsAndBase()
13055: iwSyncHeaderAndLegal()
13067: iwOnTypeChange()
13073: iwOnVehicleChange()
13091: iwOnDriverChange()
13096: iwOnContractChange()
13103: iwImportSavedPhotos()
13114: iwUploadPhotos()
13167: iwResolveEntregaBaseline()
13188: iwRunAIOnList()
13214: iwAnalyzeWithAI()
13221: iwRenderPhotos()
13260: iwUpdatePhotoField()
13265: iwUpdatePhotoDamage()
13273: iwRemovePhoto()
13279: iwRenderDamagesSummary()
13294: iwRenderComparison()
13313: iwRenderChecklist()
13332: persistInspectionTerm()
13435: saveInspectionDraft()
13436: emitInspectionTerm()
13438: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13439: blobToEmbeddableJpeg()
13469: embedBlobIntoPdf()
13482: generateInspectionPdfBytes()
13682: ensureInspectionPdfBlob()
13692: downloadInspectionPdf()
13704: printInspectionPdf()
13717: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13718: closeInspectionDetail()
13719: openInspectionDetail()
13779: saveInspectionSignatures()
13805: uploadSignedInspectionFile()
13827: cancelInspectionPrompt()

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
- supabase/2026-11-25-remover-whatsapp-api.sql: REMOVER O WHATSAPP OFICIAL (API da Meta) (25/11/2026, pedido do dono: "remova tudo sobre a api da meta").
- supabase/2026-11-25-tirar-encargos.sql: TIRAR MULTA E JUROS PELO APP (25/11/2026, pedido do dono; antes foi feito à mão para o Soyer). Já aplicado no Supabase.
- supabase/2026-11-25-whatsapp-locadora.sql: WHATSAPP DA LOCADORA (25/11/2026, pedido do dono). Já aplicado no Supabase.
